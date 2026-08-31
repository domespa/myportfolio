import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Vite non esegue le serverless function in api/: quello lo fa Vercel.
// Senza questo plugin /api/chat risponde 404 in locale e la chat mostra
// "Il servizio non risponde". Qui montiamo lo stesso handler a mano,
// simulando le due cose che Vercel fa e Vite no: parsare il body JSON
// e fornire l'interfaccia res.status().json().
function apiDevServer(env) {
  return {
    name: "api-dev-server",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res, next) => {
        if (req.method !== "POST") return next();

        let raw = "";
        for await (const chunk of req) raw += chunk;
        try {
          req.body = raw ? JSON.parse(raw) : {};
        } catch {
          req.body = {};
        }

        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (obj) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(obj));
          return res;
        };

        try {
          // La function legge process.env, che in dev non contiene
          // le variabili senza prefisso VITE_: gliele passiamo qui.
          Object.assign(process.env, env);
          const { default: handler } = await server.ssrLoadModule(
            "/api/chat.js",
          );
          await handler(req, res);
        } catch (err) {
          server.config.logger.error(`[api/chat] ${err.stack || err}`);
          if (!res.headersSent) res.status(500).json({ error: "errore locale" });
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Prefisso "" = carica anche le variabili senza VITE_, come GEMINI_API_KEY.
  // Restano lato Node: non finiscono nel bundle.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), apiDevServer(env)],
  };
});

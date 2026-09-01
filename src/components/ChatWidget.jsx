import { useEffect, useRef, useState } from "react";
import "../style/chatwidget.css";

const SUGGERIMENTI = [
  "Che stack usi?",
  "Parlami di ScissorFlow",
  "Sei disponibile?",
  "Hai esperienza con i pagamenti?",
];

// La chiave sta nella serverless function, mai qui: tutto passa da /api/chat.
async function askAPI(text, history) {
  const r = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text, history }),
  });
  if (!r.ok) throw new Error(r.status === 429 ? "rate" : "server");
  const d = await r.json();
  return d.reply;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      from: "bot",
      t: "Ciao, sono MimmoBot, l'assistente virtuale di Domenico. Dimmi tutto!",
    },
  ]);
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);

  const feedRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (feedRef.current)
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [msgs, busy]);

  // Il focus arriva a fine transizione; se il pannello si richiude prima,
  // il timer va annullato o ruba il focus a pannello chiuso.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 240);
    return () => clearTimeout(t);
  }, [open]);

  // Esc chiude il pannello
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const send = async (text) => {
    const q = (text ?? value).trim();
    if (!q || busy) return;

    setValue("");
    setBusy(true);
    // Lo storico parte da prima di questa domanda: la domanda viaggia a parte.
    const storico = msgs;
    setMsgs((m) => [...m, { from: "me", t: q }]);

    try {
      const reply = await askAPI(q, storico);
      setMsgs((m) => [...m, { from: "bot", t: reply }]);
    } catch (err) {
      setMsgs((m) => [
        ...m,
        {
          from: "bot",
          err: true,
          t:
            err.message === "rate"
              ? "Troppe domande in poco tempo. Riprova fra un minuto."
              : "Il servizio non risponde. Scrivimi dalla pagina contatti.",
        },
      ]);
    }
    setBusy(false);
  };

  return (
    <>
      {/* inert da chiuso: senza, i 7 controlli restano nel giro di tab
          anche se il pannello e' invisibile. */}
      <div
        className={`cw-panel ${open ? "open" : ""}`}
        inert={!open}
        aria-label="Chat con Domenico"
      >
        <div className="cw-head">
          <img src="/chatbot.png" alt="" className="cw-head-face" />
          <div className="cw-head-txt">
            <span className="cw-head-name">MimmoBot</span>
            <span className="cw-head-sub">Assistente AI</span>
          </div>
          <button
            className="cw-close"
            onClick={() => setOpen(false)}
            aria-label="Chiudi"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="cw-feed" ref={feedRef} role="log" aria-live="polite">
          {msgs.map((m, i) => (
            <div className={`cw-msg cw-${m.from}`} key={i}>
              <span className={`cw-bubble ${m.err ? "cw-err" : ""}`}>
                {m.t}
              </span>
            </div>
          ))}
          {busy && (
            <div className="cw-msg cw-bot">
              <span className="cw-bubble cw-typing">
                <i />
                <i />
                <i />
              </span>
            </div>
          )}
        </div>

        {msgs.length <= 1 && (
          <div className="cw-chips">
            {SUGGERIMENTI.map((s) => (
              <button key={s} className="cw-chip" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="cw-input">
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Scrivi una domanda…"
            aria-label="Scrivi una domanda"
            maxLength={300}
          />
          <button
            className="cw-send"
            onClick={() => send()}
            disabled={busy}
            aria-label="Invia"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      <button
        className={`cw-fab ${open ? "hidden" : ""}`}
        onClick={() => setOpen(true)}
        aria-label="Fai una domanda a Domenico"
      >
        <img src="/chatbot.png" alt="" />
        <span className="cw-status" aria-hidden="true" />
        <span className="cw-tip">Fammi una domanda</span>
      </button>
    </>
  );
}

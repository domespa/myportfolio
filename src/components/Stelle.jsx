import { useEffect, useRef } from "react";

// Campo di pixel in deriva dietro l'hero.
// Canvas e non DOM: qualche centinaio di <div> animati farebbero ginocchia
// al compositor, qui e' un solo elemento e un disegno per frame.
//
// Tre accortezze che contano piu' dell'effetto:
//  - si ferma quando la sezione esce dallo schermo o la scheda va in background
//  - rispetta prefers-reduced-motion disegnando un fotogramma fermo
//  - i colori arrivano dai token del tema, non riscritti a mano

const DENSITA = 1 / 3200; // pixel per px^2 di superficie
const MAX_PIXEL = 460;

export default function Stelle() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const radice = getComputedStyle(document.documentElement);
    const token = (n, fallback) =>
      radice.getPropertyValue(n).trim() || fallback;
    const AMBRA = token("--amber", "#ffa83d");
    const CHIARO = token("--txt", "#e9eef5");
    const TENUE = token("--dim", "#b3bfcd");

    const menoMoto = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let larghezza = 0;
    let altezza = 0;
    let pixel = [];
    let frame = null;
    let ultimo = 0;

    const casuale = (min, max) => min + Math.random() * (max - min);

    function crea() {
      const quanti = Math.min(
        MAX_PIXEL,
        Math.round(larghezza * altezza * DENSITA),
      );
      pixel = Array.from({ length: quanti }, () => {
        // profondita' 0..1: i piu' "vicini" sono grandi, luminosi e veloci
        const z = Math.random();
        return {
          x: Math.random() * larghezza,
          y: Math.random() * altezza,
          z,
          lato: z > 0.93 ? 3 : z > 0.7 ? 2 : 1.4,
          vx: casuale(-5, 12) * (0.45 + z),
          vy: casuale(-7, 7) * (0.45 + z),
          base: 0.3 + z * 0.6,
          fase: Math.random() * Math.PI * 2,
          velFase: casuale(0.4, 1.4),
          // Ondulazione lenta: le traiettorie curvano appena invece di
          // essere rette perfette, cosi' il campo respira.
          faseOnda: Math.random() * Math.PI * 2,
          velOnda: casuale(0.08, 0.24),
          ampOnda: casuale(1.5, 5) * (0.4 + z),
          colore: Math.random() < 0.16 ? AMBRA : z > 0.55 ? CHIARO : TENUE,
        };
      });
    }

    function dimensiona() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      larghezza = r.width;
      altezza = r.height;
      canvas.width = Math.round(larghezza * dpr);
      canvas.height = Math.round(altezza * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      crea();
    }

    function disegna(dt, t) {
      ctx.clearRect(0, 0, larghezza, altezza);
      for (const p of pixel) {
        if (dt) {
          const onda = Math.sin(t * p.velOnda + p.faseOnda) * p.ampOnda;
          p.x += (p.vx + onda) * dt;
          p.y += (p.vy - onda * 0.6) * dt;
          // avvolgimento ai bordi: il campo non si svuota mai
          if (p.x < -2) p.x = larghezza + 2;
          else if (p.x > larghezza + 2) p.x = -2;
          if (p.y < -2) p.y = altezza + 2;
          else if (p.y > altezza + 2) p.y = -2;
        }
        const luce = dt
          ? p.base * (0.55 + 0.45 * Math.sin(t * p.velFase + p.fase))
          : p.base;
        ctx.globalAlpha = luce;
        ctx.fillStyle = p.colore;
        // Coordinate a subpixel, senza arrotondare: con Math.round una stella
        // lenta resta ferma per decine di frame e poi salta di un pixel intero.
        // L'antialiasing che ne deriva vale come sfocatura di profondita'.
        ctx.fillRect(p.x, p.y, p.lato, p.lato);
      }
      ctx.globalAlpha = 1;
    }

    function ciclo(ora) {
      const dt = ultimo ? Math.min((ora - ultimo) / 1000, 0.05) : 0.016;
      ultimo = ora;
      disegna(dt, ora / 1000);
      frame = requestAnimationFrame(ciclo);
    }

    function avvia() {
      if (frame || menoMoto) return;
      ultimo = 0;
      frame = requestAnimationFrame(ciclo);
    }
    function ferma() {
      if (frame) cancelAnimationFrame(frame);
      frame = null;
    }

    dimensiona();
    if (menoMoto) {
      disegna(0, 0); // un fotogramma fermo, niente animazione
    } else {
      avvia();
    }

    const ro = new ResizeObserver(() => {
      dimensiona();
      if (menoMoto) disegna(0, 0);
    });
    ro.observe(canvas);

    // Fuori dallo schermo non serve disegnare nulla.
    const io = new IntersectionObserver(
      ([voce]) => (voce.isIntersecting ? avvia() : ferma()),
      { threshold: 0 },
    );
    io.observe(canvas);

    const suVisibilita = () =>
      document.hidden ? ferma() : io.takeRecords().length || avvia();
    document.addEventListener("visibilitychange", suVisibilita);

    return () => {
      ferma();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", suVisibilita);
    };
  }, []);

  return <canvas ref={canvasRef} className="stelle" aria-hidden="true" />;
}

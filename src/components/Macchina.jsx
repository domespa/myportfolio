import { useEffect, useRef, useState } from "react";
import "../style/macchina.css";

const CHAT = [
  { from: "cliente", t: "Ciao, avrei bisogno di un'app" },
  { from: "io", t: "Un'app per fare cosa?" },
  { from: "cliente", t: "Boh, tipo per il negozio. Come ce l'hanno tutti" },
  {
    from: "io",
    t: "Partiamo da un'altra parte: cos'è che oggi ti fa perdere più tempo?",
  },
  {
    from: "cliente",
    t: "Le prenotazioni. Mi arrivano su WhatsApp e si accavallano, siamo in tre",
  },
  { from: "io", t: "Quante al giorno?" },
  { from: "cliente", t: "Una trentina" },
  {
    from: "io",
    t: "Allora l'app non ti serve. Nessuno la scarica per prenotare due volte al mese.",
  },
  {
    from: "io",
    t: "Ti serve una pagina che apri dal link, con gli slot divisi per operatore.",
  },
  { from: "cliente", t: "E per quelli che poi non si presentano?" },
  {
    from: "io",
    t: "Conferma via SMS il giorno prima. Costa qualche centesimo a messaggio e ti recupera lo slot.",
  },
  { from: "cliente", t: "Quanto ci vuole?" },
  {
    from: "io",
    t: "Una cosa del genere l'ho già costruita. Guardala e dimmi se è quello che intendi.",
  },
];

// Ritmo: pausa di lettura proporzionale alla lunghezza, piu' il tempo di battitura.
const readMs = (t) => Math.min(2600, 700 + t.length * 26);
const typeMs = (t) => Math.min(1500, 400 + t.length * 14);

export default function Macchina() {
  const [on, setOn] = useState(false);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(null); // "cliente" | "io" | null
  const feedRef = useRef(null);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  // Lo spegnimento azzera la conversazione qui, dal click:
  // l'effetto si limita ad avviare e a smontare la sequenza.
  const togglePower = () => {
    if (on) {
      clearTimers();
      setShown(0);
      setTyping(null);
    }
    setOn(!on);
  };

  useEffect(() => {
    if (!on) return;

    let i = 0;
    const next = () => {
      if (i >= CHAT.length) {
        setTyping(null);
        return;
      }
      const msg = CHAT[i];
      setTyping(msg.from);

      timers.current.push(
        setTimeout(() => {
          setTyping(null);
          setShown(i + 1);
          i += 1;
          timers.current.push(setTimeout(next, readMs(msg.t)));
        }, typeMs(msg.t)),
      );
    };

    // Un secondo di schermo acceso prima che parta la conversazione.
    timers.current.push(setTimeout(next, 1100));
    return clearTimers;
  }, [on]);

  useEffect(() => {
    if (feedRef.current)
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [shown, typing]);

  const skip = () => {
    clearTimers();
    setTyping(null);
    setShown(CHAT.length);
  };

  const done = shown >= CHAT.length;

  return (
    <section className={`mc ${on ? "on" : ""}`}>
      <div className="mc-inner">
        <div className="mc-copy">
          <p className="mono-label">Come si comincia</p>
          <h2 className="mc-title">Accendi le tue idee.</h2>
        </div>

        <div className="mc-machine">
          <div className="mc-bezel">
            <div className="mc-screen">
              <div className="mc-flash" aria-hidden="true" />
              <div className="mc-scan" aria-hidden="true" />

              <div className="mc-window">
                <div className="mc-titlebar">
                  <span className="mc-who">cliente</span>
                  <span className="mc-sep">·</span>
                  <span className="mc-who mc-me">domenico</span>
                </div>

                <div className="mc-feed" ref={feedRef}>
                  {CHAT.slice(0, shown).map((m, i) => (
                    <div className={`mc-msg mc-${m.from}`} key={i}>
                      <span className="mc-bubble">{m.t}</span>
                    </div>
                  ))}

                  {typing && (
                    <div className={`mc-msg mc-${typing}`}>
                      <span className="mc-bubble mc-typing">
                        <i />
                        <i />
                        <i />
                      </span>
                    </div>
                  )}

                  {done && (
                    <div className="mc-end">
                      <a
                        href="https://www.scissorflow.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mc-end-link"
                      >
                        Apri ScissorFlow →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mc-bar">
              <span className="mc-brand mono-label">DS — workstation</span>

              <div className="mc-bar-right">
                {on && !done && (
                  <button className="mc-skip mono-label" onClick={skip}>
                    Salta
                  </button>
                )}
                <button
                  className="mc-pwr"
                  onClick={togglePower}
                  aria-pressed={on}
                  aria-label={on ? "Spegni" : "Accendi le tue idee"}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3v9" />
                    <path d="M6.5 6.5a8 8 0 1 0 11 0" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="mc-neck" />
          <div className="mc-base" />

          <p className="mc-hint mono-label">
            {on ? "Sistema avviato" : "Premi il tasto di accensione"}
          </p>
        </div>
      </div>
    </section>
  );
}

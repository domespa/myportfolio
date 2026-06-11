import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";

// RIGHE DEL DEPLOY LOG SUL MONITOR
const DEPLOY_LINES = [
  { color: "#8b949e", text: "$ git push origin main" },
  { color: "#4ade80", text: "Enumerating objects: 14, done." },
  { color: "#4ade80", text: "Writing objects: 100%... done." },
  { color: "#8b949e", text: "" },
  { color: "#60a5fa", text: "> scissorflow deploy --prod" },
  { color: "#8b949e", text: "Detected framework: Vite + Node" },
  { color: "#8b949e", text: "Installing dependencies..." },
  { color: "#4ade80", text: "Dependencies installed." },
  { color: "#8b949e", text: "Building frontend..." },
  { color: "#4ade80", text: "Build completed in 2.4s" },
  { color: "#8b949e", text: "Bundle size: 148kb (gzipped)" },
  { color: "#8b949e", text: "Uploading to production..." },
  { color: "#4ade80", text: "Upload complete." },
  { color: "#8b949e", text: "Running health checks..." },
  { color: "#4ade80", text: "All checks passed." },
  { color: "#8b949e", text: "" },
  { color: "#ffd700", text: "Deployed to production!" },
  { color: "#60a5fa", text: "https://scissorflow.app" },
  { color: "#8b949e", text: "$ _" },
];

// TASTI TASTIERA
const KB_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", "."],
  ["1", "2", "3", "4", "5", "6", "7", "8"],
];

// KEYFRAMES COLORI CIELO IN BASE ALL'ORA
const SKY_KEYS = [
  { m: 0, top: [5, 5, 20], bot: [10, 10, 35] },
  { m: 240, top: [8, 8, 30], bot: [15, 15, 50] },
  { m: 330, top: [40, 30, 80], bot: [100, 60, 40] },
  { m: 390, top: [80, 120, 200], bot: [255, 160, 80] },
  { m: 450, top: [100, 170, 230], bot: [255, 200, 120] },
  { m: 720, top: [40, 130, 220], bot: [135, 195, 255] },
  { m: 1020, top: [70, 150, 230], bot: [160, 210, 255] },
  { m: 1080, top: [80, 100, 180], bot: [255, 150, 60] },
  { m: 1140, top: [40, 30, 80], bot: [180, 80, 30] },
  { m: 1200, top: [20, 15, 50], bot: [60, 30, 20] },
  { m: 1439, top: [5, 5, 20], bot: [10, 10, 35] },
];

// UTILS COLORE
function lerp(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}
function rgb(c) {
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

function getSkyColors(mins) {
  let k1 = SKY_KEYS[0],
    k2 = SKY_KEYS[1];
  for (let i = 0; i < SKY_KEYS.length - 1; i++) {
    if (mins >= SKY_KEYS[i].m && mins < SKY_KEYS[i + 1].m) {
      k1 = SKY_KEYS[i];
      k2 = SKY_KEYS[i + 1];
      break;
    }
  }
  const t = (mins - k1.m) / Math.max(1, k2.m - k1.m);
  return { top: lerp(k1.top, k2.top, t), bot: lerp(k1.bot, k2.bot, t) };
}

// DISEGNA IL CIELO NELLA FINESTRA
function drawSky(ctx, canvas, mins) {
  const w = canvas.width,
    h = canvas.height;
  const sky = getSkyColors(mins);

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, rgb(sky.top));
  grad.addColorStop(1, rgb(sky.bot));
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // STELLE SOLO DI NOTTE
  const starOpacity =
    mins < 390
      ? 1
      : mins < 450
        ? 1 - (mins - 390) / 60
        : mins < 1080
          ? 0
          : mins < 1140
            ? (mins - 1080) / 60
            : 1;

  if (starOpacity > 0) {
    const positions = [
      [0.08, 0.07],
      [0.18, 0.03],
      [0.32, 0.11],
      [0.48, 0.04],
      [0.63, 0.09],
      [0.79, 0.05],
      [0.91, 0.13],
      [0.14, 0.18],
      [0.43, 0.06],
      [0.7, 0.16],
      [0.55, 0.13],
      [0.24, 0.26],
      [0.6, 0.2],
    ];
    positions.forEach(([rx, ry], i) => {
      const twinkle =
        0.5 + 0.5 * Math.sin((Date.now() / 900) * (0.4 + i * 0.25) + i);
      ctx.globalAlpha = starOpacity * (0.3 + 0.7 * twinkle);
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(rx * w, ry * h * 0.55, i % 3 === 0 ? 1.5 : 0.9, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  // LUNA
  if (mins >= 1080 || mins <= 420) {
    let norm = mins >= 1140 ? (mins - 1140) / 660 : (mins + 300) / 660;
    norm = Math.max(0, Math.min(1, norm));
    const mx = w * norm;
    const my = h * 0.28 - Math.sin(Math.PI * norm) * h * 0.2;
    const alpha =
      mins >= 1080
        ? Math.min(1, (mins - 1080) / 60)
        : Math.min(1, (420 - mins) / 80 + 0.2);
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.fillStyle = "#ddd8c0";
    ctx.beginPath();
    ctx.arc(mx, my, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = rgb(sky.top);
    ctx.globalAlpha *= 0.45;
    ctx.beginPath();
    ctx.arc(mx + 6, my - 3, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // SOLE
  if (mins >= 360 && mins <= 1140) {
    const t = (mins - 360) / (1140 - 360);
    const sx = w * t;
    const sy = h * 0.34 - Math.sin(Math.PI * t) * h * 0.26;
    const sz = 16 + Math.sin(t * Math.PI) * 7;
    ctx.save();
    const glow = ctx.createRadialGradient(sx, sy, sz, sx, sy, sz * 3.5);
    glow.addColorStop(0, "rgba(255,200,60,0.2)");
    glow.addColorStop(1, "rgba(255,160,0,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(sx, sy, sz * 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = t < 0.08 || t > 0.92 ? "#ff9030" : "#ffd700";
    ctx.beginPath();
    ctx.arc(sx, sy, sz, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// CALCOLA INTENSITA LAMPADA IN BASE ALL'ORA
function getLampIntensity(mins) {
  if (mins < 390 || mins > 1080) return 1;
  if ((mins >= 1020 && mins <= 1140) || (mins >= 360 && mins <= 480))
    return 0.5;
  return 0;
}

// TASTIERA
function Keyboard({ activeKey }) {
  return (
    <div
      style={{
        background: "#1c1c1c",
        borderRadius: "4px 4px 6px 6px",
        padding: "4px 5px 5px",
        border: "1px solid #2a2a2a",
        transform: "rotateX(38deg)",
        transformOrigin: "top center",
        boxShadow: "0 10px 0 #080808, 0 13px 16px rgba(0,0,0,0.6)",
        width: 185,
        flexShrink: 0,
      }}
    >
      {KB_ROWS.map((labels, ri) => (
        <div
          key={ri}
          style={{
            display: "flex",
            gap: 2,
            marginBottom: 2,
            justifyContent: "center",
          }}
        >
          {labels.map((label, ki) => {
            const id = `${ri}_${ki}`;
            const on = activeKey === id;
            return (
              <div
                key={ki}
                style={{
                  height: 13,
                  minWidth: 13,
                  flex: 1,
                  maxWidth: 16,
                  borderRadius: 2,
                  background: on ? "#4ade80" : "#282828",
                  borderBottom: on
                    ? "1px solid #22a060"
                    : "1.5px solid #0a0a0a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 5.5,
                  fontFamily: "-apple-system,sans-serif",
                  color: on ? "#042" : "#666",
                  fontWeight: 700,
                  transform: on ? "translateY(1px)" : "none",
                  transition: "background 0.06s, transform 0.06s",
                  userSelect: "none",
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
      ))}
      <div style={{ display: "flex", gap: 2, justifyContent: "center" }}>
        {["fn", "⌘"].map((l, i) => (
          <div
            key={i}
            style={{
              height: 13,
              minWidth: 13,
              flex: 1.4,
              maxWidth: 22,
              borderRadius: 2,
              background: "#282828",
              borderBottom: "1.5px solid #0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 5,
              color: "#555",
              fontWeight: 700,
              userSelect: "none",
            }}
          >
            {l}
          </div>
        ))}
        <div
          style={{
            height: 13,
            flex: 5,
            maxWidth: 80,
            borderRadius: 2,
            background: activeKey === "space" ? "#4ade80" : "#282828",
            borderBottom:
              activeKey === "space"
                ? "1px solid #22a060"
                : "1.5px solid #0a0a0a",
            transform: activeKey === "space" ? "translateY(1px)" : "none",
            transition: "background 0.06s",
          }}
        />
        {["⌘", "⌥"].map((l, i) => (
          <div
            key={i}
            style={{
              height: 13,
              minWidth: 13,
              flex: 1.4,
              maxWidth: 22,
              borderRadius: 2,
              background: "#282828",
              borderBottom: "1.5px solid #0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 5,
              color: "#555",
              fontWeight: 700,
              userSelect: "none",
            }}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

// COMPONENTE PRINCIPALE
export default function Hero() {
  const skyCanvasRef = useRef(null);
  const screenRef = useRef(null);
  const monitorRef = useRef(null);
  const kbRowRef = useRef(null);
  const kbRef = useRef(null);
  const rafRef = useRef(null);
  const deployTimer = useRef(null);
  const pressTimer = useRef(null);
  const pressIv = useRef(null);

  const [activeKey, setActiveKey] = useState(null);
  const [offsetMinutes, setOffsetMinutes] = useState(0);
  const [seconds, setSeconds] = useState(new Date().getSeconds());
  const [pressedBtn, setPressedBtn] = useState(null);

  // TICK OGNI SECONDO
  useEffect(() => {
    const id = setInterval(() => setSeconds(new Date().getSeconds()), 1000);
    return () => clearInterval(id);
  }, []);

  // MINUTI DISPLAY (ORA REALE + OFFSET)
  const getRealMins = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };
  const displayMins = getRealMins() + offsetMinutes;
  const displayMinsNorm = ((displayMins % 1440) + 1440) % 1440;

  // FORMATTA HH:MM:SS
  const formatTime = (mins, secs) => {
    const total = ((mins % 1440) + 1440) % 1440;
    return [
      String(Math.floor(total / 60)).padStart(2, "0"),
      String(total % 60).padStart(2, "0"),
      String(secs).padStart(2, "0"),
    ].join(":");
  };

  const clockLabel =
    offsetMinutes === 0
      ? "live"
      : offsetMinutes > 0
        ? `+${offsetMinutes}min`
        : `${offsetMinutes}min`;

  const lampIntensity = getLampIntensity(displayMinsNorm);

  // LOOP CANVAS CIELO
  useEffect(() => {
    const canvas = skyCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = 190;
    canvas.height = 165;

    const loop = () => {
      drawSky(ctx, canvas, displayMinsNorm);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [displayMinsNorm]);

  // DEPLOY LOG SUL MONITOR
  useEffect(() => {
    let lineIdx = 0;
    const allKeys = [];
    KB_ROWS.forEach((labels, ri) =>
      labels.forEach((_, ki) => allKeys.push(`${ri}_${ki}`)),
    );

    const pressKey = () => {
      const id = allKeys[Math.floor(Math.random() * allKeys.length)];
      setActiveKey(id);
      setTimeout(() => setActiveKey(null), 120);
      if (Math.random() > 0.75) {
        setTimeout(() => {
          setActiveKey("space");
          setTimeout(() => setActiveKey(null), 90);
        }, 30);
      }
    };

    const renderLines = (n) => {
      if (!screenRef.current) return;
      let html = "";
      for (let i = 0; i < n; i++) {
        const l = DEPLOY_LINES[i];
        html += `<div style="color:${l.color};white-space:pre">${l.text}</div>`;
      }
      if (n < DEPLOY_LINES.length)
        html += `<span style="color:#c9d1d9">&#9612;</span>`;
      screenRef.current.innerHTML = html;
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    };

    const step = () => {
      renderLines(lineIdx);
      if (lineIdx < DEPLOY_LINES.length) {
        pressKey();
        lineIdx++;
        const line = DEPLOY_LINES[lineIdx - 1];
        const delay =
          line?.text === ""
            ? 180
            : line?.text.includes("...")
              ? 650
              : 320 + Math.random() * 220;
        deployTimer.current = setTimeout(step, delay);
      } else {
        deployTimer.current = setTimeout(() => {
          lineIdx = 0;
          step();
        }, 3000);
      }
    };

    renderLines(0);
    deployTimer.current = setTimeout(step, 600);
    return () => clearTimeout(deployTimer.current);
  }, []);

  // ALLINEA TASTIERA SOTTO IL CENTRO DEL MONITOR
  useEffect(() => {
    const align = () => {
      const mon = monitorRef.current;
      const kb = kbRef.current;
      const row = kbRowRef.current;
      if (!mon || !kb || !row) return;
      const monRect = mon.getBoundingClientRect();
      const rowRect = row.getBoundingClientRect();
      const cx = monRect.left + monRect.width / 2 - rowRect.left;
      kb.style.marginLeft =
        Math.max(0, Math.round(cx - kb.offsetWidth / 2)) + "px";
      kb.style.marginRight = "0";
    };
    const id = setTimeout(align, 80);
    window.addEventListener("resize", align);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", align);
    };
  }, []);

  // LONG PRESS OROLOGIO
  const startPress = useCallback((step, btnId) => {
    setPressedBtn(btnId);
    setOffsetMinutes((prev) => prev + step);
    pressTimer.current = setTimeout(() => {
      pressIv.current = setInterval(() => {
        setOffsetMinutes((prev) => prev + step);
      }, 30);
    }, 350);
  }, []);

  const stopPress = useCallback(() => {
    setPressedBtn(null);
    clearTimeout(pressTimer.current);
    clearInterval(pressIv.current);
  }, []);

  // STILE BOTTONI OROLOGIO CON FEEDBACK VISIVO AL PRESS
  const ctrlStyle = (size, id) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: size,
    height: size,
    borderRadius: "50%",
    border: "1px solid rgba(74,222,128,0.2)",
    background:
      pressedBtn === id ? "rgba(74,222,128,0.28)" : "rgba(74,222,128,0.05)",
    color: "rgba(74,222,128,0.7)",
    cursor: "pointer",
    userSelect: "none",
    flexShrink: 0,
    transition: "background 0.1s",
  });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section aria-label="Presentazione" className="hero-room">
      {/* MURO E STANZA */}
      <div className="hero-wall">
        {/* FINESTRA A DESTRA CON IL CIELO */}
        <div className="hero-window-wrap">
          <div className="hero-window-frame">
            <canvas ref={skyCanvasRef} className="hero-sky-canvas" />
          </div>
          <div className="hero-curtain-rod" />
          <div className="hero-curtain-left" />
          <div className="hero-curtain-right" />
        </div>

        {/* LAMPADA DA TERRA A SINISTRA */}
        <div className="hero-lamp">
          <div className="hero-lamp-head">
            <div
              className="hero-lamp-glow"
              style={{
                background:
                  lampIntensity > 0
                    ? `rgba(255,200,80,${lampIntensity * 1.0})`
                    : "transparent",
              }}
            />
          </div>
          <div className="hero-lamp-neck" />
          <div className="hero-lamp-base" />
        </div>

        {/* EFFETTO LUCE LAMPADA SUL MURO */}
        <div
          className="hero-lamp-wall-glow"
          style={{
            opacity: lampIntensity > 0 ? lampIntensity * 0.95 : 0,
          }}
        />

        {/* ALONE LAMPADA SUL PAVIMENTO */}
        <div
          className="hero-lamp-floor-glow"
          style={{
            background:
              lampIntensity > 0
                ? `rgba(255,200,80,${lampIntensity * 0.18})`
                : "transparent",
          }}
        />

        {/* QUADRO APPESO AL MURO */}
        <div className="hero-picture-frame">
          {/* GANCIO */}
          <div className="hero-picture-hook" />

          <div className="hero-card-inner">
            {/* FOTO */}
            <div className="hero-card-photo">
              <img src="/foto.png" alt="Domenico Spampinato" />
            </div>

            {/* TESTO */}
            <div className="hero-card-body">
              <h1 className="hero-card-name">Domenico Spampinato</h1>
              <p className="hero-card-role">Full-Stack Developer</p>
              <div className="hero-card-divider" />
              <p className="hero-card-desc">
                Costruisco e-commerce, SaaS, blog e siti web moderni e
                performanti, ottimizzati per mobile e pronti per la produzione.
                Dall'architettura al deploy, con attenzione alle performance,
                all'esperienza utente e alla scalabilità.
              </p>

              <div className="hero-card-bottom">
                {/* SOCIAL */}
                <div className="hero-card-socials">
                  {[
                    {
                      href: "https://github.com/domespa",
                      label: "GitHub",
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      ),
                    },
                    {
                      href: "https://www.linkedin.com/in/domespa/",
                      label: "LinkedIn",
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      ),
                    },
                    {
                      href: "/cv-domenico-spampinato.pdf",
                      label: "CV",
                      download: true,
                      icon: (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      ),
                    },
                  ].map(({ href, label, icon, download }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target={download ? undefined : "_blank"}
                      rel={download ? undefined : "noopener noreferrer"}
                      download={download || undefined}
                      className="hero-social-btn"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="hero-card-divider" />
          {/* CTA */}
          <div className="hero-card-cta">
            <button
              className="hero-btn-secondary"
              onClick={() => scrollTo("about")}
            >
              Chi sono
            </button>
            <button
              className="hero-btn-secondary"
              onClick={() => scrollTo("skills")}
            >
              Skills
            </button>
            <Link to="/contatti" className="hero-btn-secondary">
              Scrivimi
            </Link>
            <Link to="/progetti" className="hero-btn-primary">
              Progetti
            </Link>
          </div>
        </div>

        {/* BATTISCOPA */}
        <div className="hero-baseboard" />
      </div>

      {/* PAVIMENTO */}
      <div className="hero-floor" />

      {/* SCRIVANIA */}
      <div className="hero-desk-wrap">
        {/* MONITOR + OROLOGIO SOPRA IL PIANO */}
        <div className="hero-above-desk">
          {/* MONITOR */}
          <div ref={monitorRef} className="hero-monitor-group">
            <div className="hero-monitor-body">
              <div className="hero-monitor-cam-bar">
                <div className="hero-monitor-cam" />
              </div>
              <div ref={screenRef} className="hero-monitor-screen" />
            </div>
            <div className="hero-monitor-neck" />
            <div className="hero-monitor-base" />
          </div>

          {/* OROLOGIO PLAYER */}
          <div className="hero-clock">
            <div className="hero-clock-time">
              {formatTime(displayMins, seconds)}
            </div>
            <div className="hero-clock-label">{clockLabel}</div>

            <div className="hero-clock-controls">
              {/* INDIETRO */}
              <div
                style={ctrlStyle(20, "back")}
                onMouseDown={() => startPress(-5, "back")}
                onMouseUp={stopPress}
                onMouseLeave={stopPress}
                onTouchStart={(e) => {
                  e.preventDefault();
                  startPress(-5, "back");
                }}
                onTouchEnd={stopPress}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="11,4 2,12 11,20" />
                  <polygon points="22,4 13,12 22,20" />
                </svg>
              </div>

              {/* REFRESH */}
              <div
                style={ctrlStyle(24, "reset")}
                onClick={() => {
                  setOffsetMinutes(0);
                  setPressedBtn(null);
                }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
              </div>

              {/* AVANTI */}
              <div
                style={ctrlStyle(20, "fwd")}
                onMouseDown={() => startPress(5, "fwd")}
                onMouseUp={stopPress}
                onMouseLeave={stopPress}
                onTouchStart={(e) => {
                  e.preventDefault();
                  startPress(5, "fwd");
                }}
                onTouchEnd={stopPress}
              >
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="13,4 22,12 13,20" />
                  <polygon points="2,4 11,12 2,20" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* PIANO CON ALONE LAMPADA */}
        <div className="hero-desk-surface">
          <div
            className="hero-desk-lamp-glow"
            style={{
              background:
                lampIntensity > 0
                  ? `rgba(255,200,80,${lampIntensity * 0.22})`
                  : "transparent",
            }}
          />
        </div>

        {/* TASTIERA SUL PIANO */}
        <div className="hero-desk-top-strip">
          <div ref={kbRowRef} className="hero-keyboard-row">
            <div ref={kbRef}>
              <Keyboard activeKey={activeKey} />
            </div>
          </div>
        </div>

        {/* FASCIA FRONTALE */}
        <div className="hero-desk-fascia" />

        {/* GAMBE */}
        <div className="hero-desk-legs">
          <div className="hero-desk-leg" />
          <div className="hero-desk-leg" />
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LIVE_PROJECTS } from "../data/projects";
import "../style/progetti-home.css";

gsap.registerPlugin(ScrollTrigger);

export default function ProgettiHome() {
  const sezioneRef = useRef(null);

  useEffect(() => {
    const el = sezioneRef.current;
    if (!el) return;

    // Come in About.jsx: GSAP e' JS, il blocco CSS non lo ferma.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      el.querySelectorAll(".ph-card"),
      { opacity: 0, y: 34 },
      {
        scrollTrigger: { trigger: el.querySelector(".ph-grid"), start: "top 82%" },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.11,
        ease: "power3.out",
      },
    );
  }, []);

  // Alone che segue il cursore: scrivo le coordinate come variabili CSS
  // sull'elemento invece di passarle dallo stato, cosi' non si rirenderizza
  // il componente a ogni movimento del mouse.
  const seguiCursore = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="progetti" className="ph" ref={sezioneRef}>
      <div className="ph-inner">
        <div className="ph-head">
          <div>
            <p className="mono-label">Prodotti</p>
            <h2 className="ph-title">Tre piattaforme, tutte online.</h2>
          </div>
          <Link to="/progetti" className="ph-all mono-label">
            Tutti i progetti →
          </Link>
        </div>

        <div className="ph-grid">
          {LIVE_PROJECTS.map((p) => (
            <article
              className="ph-card"
              key={p.id}
              onMouseMove={seguiCursore}
              onPointerDown={seguiCursore}
            >
              <span className="ph-alone" aria-hidden="true" />

              <div className="ph-shot">
                <img
                  src={p.cover}
                  alt={`Schermata di ${p.name}`}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="ph-body">
                <div className="ph-name-row">
                  <span className="ph-live" aria-hidden="true" />
                  <h3 className="ph-name">{p.name}</h3>
                </div>

                <p className="ph-teaser">{p.teaser}</p>

                <ul className="ph-highlights">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { LIVE_PROJECTS } from "../data/projects";
import Stelle from "./Stelle";
import "../style/hero.css";

export default function Hero() {
  return (
    <header className="hero">
      <Stelle />
      <div className="hero-inner">
        {/* COLONNA SINISTRA: POSIZIONAMENTO */}
        <div className="hero-left">
          <h1 className="hero-title">
            Costruisco SaaS e e-commerce{" "}
            <span className="hero-amber">che restano in produzione.</span>
          </h1>

          <p className="hero-lede">
            Dallo schema del database al deploy. Tre piattaforme mie girano ogni
            giorno con utenti veri, pagamenti veri e nessun team dietro a
            coprirmi. Prima di scrivere codice ho passato dieci anni a far
            vendere i siti degli altri: so anche perché un progetto deve
            rendere, non solo funzionare.
          </p>

          <div className="hero-cta">
            <Link to="/progetti" className="btn btn-solid cut">
              Vedi i progetti
            </Link>
            <a href="/cv-domenico-spampinato.pdf" download className="btn cut">
              Scarica il CV
            </a>
          </div>
        </div>

        {/* COLONNA DESTRA: SCHEDA TECNICA DEI PRODOTTI VIVI */}
        <aside className="hero-spec">
          <p className="mono-label hero-spec-head">
            Attualmente in produzione...
          </p>

          {LIVE_PROJECTS.map((p) => (
            <a
              key={p.id}
              className="hero-row"
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="hero-row-top">
                <span className="hero-live" aria-hidden="true" />
                <span className="hero-row-name">{p.name}</span>
              </span>
              <span className="hero-row-desc">{p.short}</span>
              <span className="hero-row-tags">
                {p.stack.slice(0, 5).join(" · ")}
              </span>
            </a>
          ))}
        </aside>
      </div>
    </header>
  );
}

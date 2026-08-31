import { Link } from "react-router-dom";
import { LIVE_PROJECTS } from "../data/projects";
import "../style/progetti-home.css";

export default function ProgettiHome() {
  return (
    <section id="progetti" className="ph">
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
            <article className="ph-card" key={p.id}>
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

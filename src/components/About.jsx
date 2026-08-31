import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../style/about.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelector(".about-header-block"),
      { opacity: 0, y: 40 },
      {
        scrollTrigger: { trigger: el, start: "top 72%" },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
    );

    gsap.fromTo(
      el.querySelectorAll(".about-service-item"),
      { opacity: 0, y: 20 },
      {
        scrollTrigger: {
          trigger: el.querySelector(".about-services"),
          start: "top 82%",
        },
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "back.out(1.7)",
      },
    );
  }, []);

  return (
    <section id="about" className="about-sect" ref={sectionRef}>
      <div className="about-inner">
        {/* HEADER: TAG + NOME + RUOLO + BIO */}
        <div className="about-header-block">
          <p className="mono-label">Chi sono</p>
          <h2 className="about-title">Domenico Spampinato</h2>
          <p className="about-role-line">Full-Stack Developer</p>
          <div className="about-bio">
            <p>
              Dal 2017 lavoro nel web marketing con ottimizzazione di campagne
              pubblicitarie e creazione di landing page professionali. Ho sempre
              avuto la curiosita di capire come funzionano le cose: il
              meccanismo di logica dietro un sito, come un'idea diventa codice,
              perche certe scelte tecniche funzionano e altre no.
            </p>
            <p>
              Qualche anno fa ho deciso di trasformare quella curiosita in
              professione. Dopo un percorso da autodidatta ho scelto di
              strutturare la formazione affidandomi a Boolean Careers,
              completando un bootcamp intensivo di 6 mesi con specializzazione
              in React, TypeScript e sviluppo full-stack.
            </p>
            <p>
              Oggi gestisco e sviluppo in autonomia diversi prodotti web: un
              SaaS multi-tenant, un e-commerce internazionale e un blog con
              newsletter. Costruiti da zero e aggiornati quotidianamente.
            </p>
            <p>
              Sono aperto a qualsiasi posizione da remoto. Vivo a Carlentini, in
              provincia di Siracusa, e avendo una famiglia con tre figli, il
              lavoro da remoto e per me la soluzione ideale.
            </p>
          </div>
        </div>

        {/* COSA REALIZZO */}
        <div className="about-services">
          <h3 className="about-services-title">Cosa realizzo</h3>
          <div className="about-services-grid">
            {[
              {
                icon: <rect x="2" y="3" width="20" height="14" rx="2" />,
                label: "Siti web professionali responsive",
              },
              {
                icon: (
                  <>
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </>
                ),
                label: "E-commerce con Stripe & PayPal",
              },
              {
                icon: (
                  <>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </>
                ),
                label: "SaaS & applicazioni scalabili",
              },
              {
                icon: (
                  <>
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </>
                ),
                label: "REST API & integrazioni",
              },
            ].map(({ icon, label }) => (
              <div className="about-service-item" key={label}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {icon}
                </svg>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta">
          <Link to="/progetti" className="about-cta-primary">
            Vedi i progetti
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link to="/contatti" className="about-cta-secondary">
            Contattami
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

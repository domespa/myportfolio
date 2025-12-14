import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    gsap.fromTo(
      ".about-image",
      {
        opacity: 0,
        x: -100,
        scale: 0.9,
      },
      {
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 70%",
        },
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      ".about-text",
      {
        opacity: 0,
        x: 100,
      },
      {
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 70%",
        },
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      ".service-item",
      {
        opacity: 0,
        y: 20,
      },
      {
        scrollTrigger: {
          trigger: ".services-list",
          start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      }
    );
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section id="about-section" className="about-section">
      <div className="about-container">
        <div className="about-image-wrapper">
          <div className="about-image">
            <img src="/iam.jpg" alt="Setup di lavoro - Domenico Spampinato" />
            <div className="image-overlay-about">
              <div className="overlay-badge">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                <span>Live Coding</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about-text">
          <div className="about-header">
            <div className="about-title-with-photo">
              <div className="about-photo">
                <img src="/foto.png" alt="Domenico Spampinato" />
              </div>
              <div className="about-title-text">
                <h2>Ciao, sono Domenico</h2>
                <p className="about-role">
                  <strong>Full-Stack Developer</strong> specializzato in React,
                  TypeScript e Node.js
                </p>
              </div>
            </div>
          </div>

          <div className="about-description">
            <p>
              Trasformo idee in applicazioni web performanti e scalabili. Con
              esperienza in progetti enterprise, creo soluzioni digitali che
              fanno la differenza.
            </p>
          </div>

          <div className="services-list">
            <h3>Cosa realizzo</h3>
            <div className="services-grid">
              <div className="service-item">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span>Siti web professionali responsive</span>
              </div>

              <div className="service-item">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span>E-commerce con Stripe & PayPal</span>
              </div>

              <div className="service-item">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <polyline points="13 2 13 9 20 9" />
                </svg>
                <span>Piattaforme CMS avanzate</span>
              </div>

              <div className="service-item">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <span>Dashboard analytics real-time</span>
              </div>

              <div className="service-item">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                <span>Applicazioni web scalabili</span>
              </div>

              <div className="service-item">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                <span>REST API & integrazioni</span>
              </div>
            </div>
          </div>

          <div className="about-cta">
            <button
              onClick={() => scrollToSection("skills")}
              className="about-btn-primary"
            >
              Scopri le mie skills
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </button>
            <a href="/contatti" className="about-btn-secondary">
              Contattami
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

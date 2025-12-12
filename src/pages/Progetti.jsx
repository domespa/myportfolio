export default function Progetti() {
  const progetti = [
    {
      id: "1",
      nome: "Fuxture",
      descrizioneBreve: "Blog personale",
      descrizioneApprofondita: [
        "Piattaforma blog full-stack con sistema di gestione contenuti completo.",
        "",
        "Features: autenticazione JWT con refresh token, CRUD articoli con editor rich text, sistema commenti moderato, categorizzazione e tag, NewsWidget con NewsAPI (cache 15min server-side), newsletter, analytics dashboard, SEO ottimizzato, responsive design mobile-first.",
      ],
      immagine: "./sitepng/fuxture.jpg",
      tecnologie: ["React", "TypeScript", "Node.js", "Prisma", "Supabase"],
      link: "https://github.com/domespa/fuxture",
      demo: "https://www.fuxture.net/",
    },
    {
      id: "2",
      nome: "SheThrivesADHD",
      descrizioneBreve: "E-commerce enterprise full-stack",
      descrizioneApprofondita: [
        "Piattaforma e-commerce enterprise con 95+ API endpoints.",
        "",
        "Features: sistema multi-valuta (con auto-detection), dual payment (Stripe + PayPal con webhooks), real-time WebSocket notifications e location tracking, analytics dashboard con grafici comparativi,",
      ],
      immagine: "./sitepng/ecommerce.jpg",
      tecnologie: [
        "React ",
        "TypeScript",
        "Node.js",
        "Prisma",
        "Socket.io",
        "Chart.js",
      ],
      link: "https://github.com/domespa/digital-store",
      demo: "https://www.shethrivesadhd.com/",
    },
    {
      id: "3",
      nome: "Travel Journal",
      descrizioneBreve: "Diario di Viaggio",
      descrizioneApprofondita: [
        "Applicazione web per documentare viaggi e avventure.",
        "",
        "Features: creazione itinerari personalizzati con mappa interattiva, timeline cronologica dei viaggi, tag, ricerca e filtri avanzati, calcolo distanza da punto a punto",
      ],
      immagine: "./sitepng/traveljournal.jpg",
      tecnologie: ["React", "React Leaflet", "React Portal", "Supabase"],
      link: "https://github.com/domespa/travel-journal-app",
      demo: "https://travel-journal-app-ten.vercel.app/",
    },
  ];
  return (
    <div className="prog-sect">
      <div className="container">
        <h2>projects</h2>
        <div className="prog-row">
          {progetti.map((progetto) => (
            <div className="prog-col" key={progetto.id}>
              <div className="flip-card">
                {/* FRONTE */}
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="project-image">
                      <img src={progetto.immagine} alt={progetto.nome} />
                    </div>
                    <div className="col-info">
                      <h4>{progetto.nome}</h4>
                      <p>{progetto.descrizioneBreve}</p>
                    </div>
                    <hr />
                    <div className="tech-badges">
                      {progetto.tecnologie.map((tech, index) => (
                        <span className="badge" key={index}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* RETRO */}
                  <div className="flip-card-back">
                    <div className="back-content">
                      <h4>{progetto.nome}</h4>
                      <div className="descrizione-approfondita">
                        {progetto.descrizioneApprofondita.map(
                          (paragrafo, index) => (
                            <p key={index}>{paragrafo}</p>
                          )
                        )}
                      </div>
                      <div className="project-links">
                        <a
                          href={progetto.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-btn"
                        >
                          <span>GitHub</span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                        <a
                          href={progetto.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-btn demo"
                        >
                          <span>Visualizza</span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      </div>
                      <div className="tech-badges">
                        {progetto.tecnologie.map((tech, index) => (
                          <span className="badge" key={index}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

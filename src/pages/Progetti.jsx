import { useState } from "react";
import { Link } from "react-router-dom";
import "../style/progetti.css";

const PROJECTS = [
  {
    id: "scissorflow",
    name: "ScissorFlow",
    short: "SaaS multi-tenant per barbieri",
    description:
      "ScissorFlow è una piattaforma SaaS multi-tenant per barbieri con tre piani di abbonamento: Free, Pro e Business. L'onboarding guidato permette di personalizzare il proprio sito con logo, hero e palette colori. Il piano Business include OTP via SMS per conferma prenotazione, riducendo sensibilmente i no-show, blacklist automatica per i clienti inaffidabili e calendario intelligente che ottimizza gli slot disponibili in fase di prenotazione. Reminder automatici per le prenotazioni con possibilità di disdire fino a 2 ore prima dell'inizio del taglio. Ogni negozio può integrare il widget nel proprio sito esterno mostrando recensioni e mappa della posizione. Gestione team con ruoli e permessi, upload avatar via Cloudinary, pannello admin separato e notifiche WhatsApp Business con template italiani.",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Twilio",
      "Cloudinary",
      "React Leaflet",
    ],
    buttons: [
      {
        label: "Sito SaaS",
        url: "https://www.scissorflow.com/",
        style: "secondary",
      },
      {
        label: "Vetrina Barbiere",
        url: "https://www.scissorflow.app/b/next-level-barber",
        style: "secondary",
      },
      {
        label: "Registrati",
        url: "https://www.scissorflow.app/register",
        style: "secondary",
      },
      {
        label: "GitHub",
        url: "https://github.com/domespa/scissorflow",
        style: "github",
      },
    ],
    review:
      "Il progetto più complesso che ho costruito. Dall'architettura multi-tenant al sistema di prenotazione con ottimizzazione del calendario, ogni parte ha richiesto decisioni tecniche precise. Ho gestito tutto in autonomia, dal database al deploy, dal pagamento con Stripe all'OTP via Twilio, imparando molto su scalabilità e gestione degli stati in produzione reale.",
    images: [
      "/projects/scissorflow/calendarioadmin.webp",
      "/projects/scissorflow/homepage.webp",
      "/projects/scissorflow/analytics.webp",
    ],
  },
  {
    id: "h4ppykids",
    name: "H4ppyKids / SheThrivesADHD",
    short: "E-commerce prodotti digitali",
    description:
      "H4ppyKids e SheThrivesADHD sono due e-commerce di prodotti digitali costruiti sulla stessa piattaforma. La landing page rileva automaticamente il paese di collegamento e converte i prezzi nella valuta locale, dollari canadesi, statunitensi, sterline e altre, aggiornando il cambio in tempo reale. I pagamenti sono gestiti tramite Stripe e PayPal con supporto multi-valuta. I file digitali vengono consegnati via Cloudflare R2 con link sicuri a scadenza. La dashboard admin integra WebSocket per il monitoraggio in tempo reale degli utenti: un globo 3D illumina i pixel in base alla provenienza geografica, mostrando chi è online in quel momento, da dove arriva, la percentuale di pagina scrollata, le sezioni visualizzate e i pulsanti premuti. Meta Pixel integrato per il tracciamento delle campagne pubblicitarie.",
    stack: [
      "React",
      "Node.js",
      "Stripe",
      "PayPal",
      "Cloudflare R2",
      "WebSocket",
    ],
    buttons: [
      { label: "H4ppyKids", url: "https://h4ppykids.com", style: "secondary" },
      {
        label: "SheThrivesADHD",
        url: "https://shethrivesadhd.com",
        style: "secondary",
      },
      {
        label: "GitHub",
        url: "https://github.com/domespa/digital-store-happykids",
        style: "github",
      },
    ],
    review:
      "Progetto nato per testare la vendita di prodotti digitali su mercati internazionali. La parte più interessante è stata la dashboard real-time con WebSocket e il globo 3D, vedere gli utenti arrivare da tutto il mondo in diretta è stato gratificante. Ho risolto diversi bug in produzione legati alla conversione valuta sul carrello, al tracking e al traffico bot.",
    images: [
      "/projects/ecommerce/globo.webp",
      "/projects/ecommerce/products.webp",
      "/projects/ecommerce/landing.webp",
    ],
  },
  {
    id: "fuxture",
    name: "Fuxture",
    short: "Blog e newsletter con CMS",
    description:
      "Fuxture è un blog con newsletter e CMS custom, nato dalla mia attività nel web marketing e nell'affiliate marketing. L'editor è basato su TipTap e permette di creare articoli ricchi con banner, immagini e formattazione avanzata direttamente dal pannello admin. Gli utenti possono registrarsi, commentare e interagire con i contenuti. I commenti passano attraverso un sistema di auto-moderazione che filtra automaticamente spam e contenuti inappropriati prima della pubblicazione. Il backend gestisce utenti, ruoli e newsletter, con deploy su Render e frontend su Vercel con Cloudflare come proxy.",
    stack: ["React", "Node.js", "TipTap", "PostgreSQL", "Vercel", "Cloudflare"],
    buttons: [
      { label: "Fuxture", url: "https://fuxture.net", style: "secondary" },
      {
        label: "GitHub",
        url: "https://github.com/domespa/fuxture",
        style: "github",
      },
    ],
    review:
      "Progetto nato da un'esigenza reale, avevo bisogno di uno strumento mio per pubblicare contenuti legati alla mia attività di affiliate marketing senza dipendere da piattaforme esterne. Costruire il CMS da zero con TipTap è stata la parte più interessante: gestire l'output dell'editor, i blocchi personalizzati e l'upload delle immagini ha richiesto più attenzione del previsto. Il sistema di auto-moderazione dei commenti è stato un'aggiunta che ha reso il prodotto più solido.",
    images: [
      "/projects/fuxture/home.webp",
      "/projects/fuxture/comments.webp",
      "/projects/fuxture/editor.webp",
    ],
  },
  {
    id: "traveljournal",
    name: "Travel Journal App",
    short: "App per viaggi e diari",
    description:
      "Travel Journal è un'app React per tenere traccia dei propri viaggi. Permette di aggiungere destinazioni, annotare ricordi e organizzare il proprio diario di viaggio in modo visivo. Progetto nato da un'esigenza personale, volevo uno strumento semplice e mio per raccogliere i ricordi dei posti visitati. Interamente frontend, costruito con React e CSS.",
    stack: ["React", "JavaScript", "CSS"],
    buttons: [
      {
        label: "TripTravel",
        url: "https://travel-journal-app-ten.vercel.app/",
        style: "secondary",
      },
      {
        label: "GitHub",
        url: "https://github.com/domespa/travel-journal-app",
        style: "github",
      },
    ],
    review:
      "Uno dei primi progetti che ho costruito seguendo un'idea mia, non un tutorial. Piccolo ma significativo, mi ha insegnato a ragionare sulla struttura dei componenti e sulla gestione dello stato in React partendo da zero, senza un backend a supporto.",
    images: [
      "/projects/traveljournal/home.webp",
      "/projects/traveljournal/trip.webp",
      "/projects/traveljournal/infotrip.webp",
    ],
  },
  {
    id: "boolshop",
    name: "Boolshop",
    short: "E-commerce videogiochi",
    description:
      "Boolshop è un e-commerce di videogiochi sviluppato in team durante il bootcamp Boolean Careers. Il progetto è stato realizzato in gruppo da 4 sviluppatori con metodologia agile. Mi sono occupato principalmente del chatbot integrato, della gestione delle fetch dei dati e dell'implementazione del debounce sulla ricerca. Un progetto formativo che ha simulato il lavoro in team reale con divisione dei compiti, revisione del codice e gestione dei conflitti Git.",
    stack: ["React", "JavaScript", "CSS", "Bootstrap"],
    buttons: [
      {
        label: "BoolShop",
        url: "https://fe-boolshop.vercel.app/",
        style: "secondary",
      },
      {
        label: "GitHub",
        url: "https://github.com/domespa/fe-boolshop",
        style: "github",
      },
    ],
    review:
      "Prima esperienza di sviluppo in team, presentata come progetto finale del bootcamp Boolean Careers. Lavorare in quattro sullo stesso codebase ha insegnato tanto quanto il codice stesso: comunicazione, Git flow, revisione del codice e rispetto delle scadenze. Il chatbot è stato la parte più stimolante, gestire i flussi di conversazione e integrarli con i dati del catalogo è stata una bella sfida per il livello in cui eravamo.",
    images: [
      "/projects/boolshop/home.webp",
      "/projects/boolshop/chatbot.webp",
      "/projects/boolshop/game.webp",
    ],
  },
  {
    id: "techbool",
    name: "TechBool",
    short: "Comparatore di prodotti tech",
    description:
      "Progetto individuale sviluppato per l'esame di specializzazione del bootcamp Boolean Careers. Presentato durante la valutazione finale, è stato utile per consolidare la gestione dello stato in React con liste dinamiche e confronti multipli. Semplice nella struttura ma efficace per capire come organizzare dati comparativi in modo leggibile per l'utente.",
    stack: ["React", "JavaScript", "CSS"],
    buttons: [
      {
        label: "TechBool",
        url: "https://progetto-finale-spec-frontend-front-jade.vercel.app/",
        style: "secondary",
      },
      {
        label: "GitHub",
        url: "https://github.com/domespa/progetto-finale-spec-frontend-front",
        style: "github",
      },
    ],
    review:
      "Progetto individuale sviluppato per l'esame di specializzazione del bootcamp Boolean Careers. Presentato durante la valutazione finale, è stato utile per consolidare la gestione dello stato in React con liste dinamiche e confronti multipli. Semplice nella struttura ma efficace per capire come organizzare dati comparativi in modo leggibile per l'utente.",
    images: [
      "/projects/techbool/prod.webp",
      "/projects/techbool/compara.webp",
      "/projects/techbool/pref.webp",
    ],
  },
];

const IconGlobe = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconGithub = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function Progetti() {
  const [active, setActive] = useState(PROJECTS[0]);
  const [mainImg, setMainImg] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const selectProject = (proj) => {
    setActive(proj);
    setMainImg(0);
    setMenuOpen(false);
  };

  // SIDEBAR CONDIVISA -- usata sia desktop che mobile overlay
  const SidebarContent = () => (
    <>
      <div className="prog-sidebar-label">Progetti</div>
      <nav className="prog-nav">
        {PROJECTS.map((proj) => (
          <button
            key={proj.id}
            className={`prog-nav-item ${active.id === proj.id ? "active" : ""}`}
            onClick={() => selectProject(proj)}
          >
            <span className="prog-nav-name">{proj.name}</span>
            <span className="prog-nav-short">{proj.short}</span>
          </button>
        ))}
      </nav>

      {/* BOTTONE HOMEPAGE FISSO IN FONDO */}
      <div className="prog-sidebar-bottom">
        <Link to="/" className="prog-home-btn">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Homepage
        </Link>
      </div>
    </>
  );

  return (
    <div className="prog-page">
      {/* TOPBAR MOBILE CON HAMBURGER */}
      <div className="prog-mobile-topbar">
        <span className="prog-mobile-title">{active.name}</span>
        <button
          className={`prog-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu progetti"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* SIDEBAR -- desktop fissa, mobile overlay */}
      <aside className={`prog-sidebar ${menuOpen ? "mobile-open" : ""}`}>
        <button
          className="prog-sidebar-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Chiudi menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <SidebarContent />
      </aside>

      {/* CONTENUTO PRINCIPALE */}
      <main className="prog-main">
        {/* COLONNA CENTRO */}
        <div className="prog-center">
          {/* IMMAGINE GRANDE */}
          <div className="prog-main-img-wrap">
            <img
              key={`${active.id}-${mainImg}`}
              src={active.images[mainImg]}
              alt={`${active.name} screenshot ${mainImg + 1}`}
              className="prog-main-img"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.classList.add("prog-img-placeholder");
              }}
            />
          </div>

          {/* NOME + BOTTONI */}
          <div className="prog-center-header">
            <div className="prog-center-titles">
              <h1 className="prog-name">{active.name}</h1>
              <p className="prog-short">{active.short}</p>
            </div>
            <div className="prog-links">
              {active.buttons
                .filter((b) => b.url)
                .map(({ label, url, style }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`prog-link-btn prog-link-${style}`}
                  >
                    {style === "github" ? <IconGithub /> : <IconGlobe />}
                    {label}
                  </a>
                ))}
            </div>
          </div>

          {/* DESCRIZIONE */}
          <p className="prog-description">{active.description}</p>

          {/* RECENSIONE */}
          <div className="prog-review">
            <div className="prog-review-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p>{active.review}</p>
          </div>
        </div>

        {/* COLONNA DESTRA */}
        <div className="prog-right">
          <div className="prog-thumbs">
            <p className="prog-right-label">Screenshot</p>
            {active.images.map((img, i) => (
              <button
                key={i}
                className={`prog-thumb ${mainImg === i ? "active" : ""}`}
                onClick={() => setMainImg(i)}
              >
                <img
                  src={img}
                  alt={`${active.name} ${i + 1}`}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <span className="prog-thumb-num">{i + 1}</span>
              </button>
            ))}
          </div>
          <div className="prog-stack">
            <p className="prog-right-label">Stack</p>
            <div className="prog-stack-pills">
              {active.stack.map((tech) => (
                <span className="prog-stack-pill" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

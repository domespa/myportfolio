// Sorgente unica dei progetti.
// I "live" alimentano Hero e ProgettiHome; la pagina /progetti usa l'array intero.

export const PROJECTS = [
  {
    id: "scissorflow",
    name: "ScissorFlow",
    short: "SaaS multi-tenant per barbieri",
    live: true,
    url: "https://www.scissorflow.com/",
    teaser:
      "Piattaforma di prenotazioni multi-tenant con tre piani di abbonamento. OTP via SMS contro i no-show, calendario che ottimizza gli slot, widget integrabile nel sito del barbiere.",
    highlights: [
      "Multi-tenant",
      "Stripe",
      "OTP via Twilio",
      "WhatsApp Business",
    ],
    cover: "/projects/scissorflow/homepage.webp",
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
    description:
      "ScissorFlow è una piattaforma SaaS multi-tenant per barbieri con tre piani di abbonamento: Free, Pro e Business. L'onboarding guidato permette di personalizzare il proprio sito con logo, hero e palette colori. Il piano Business include OTP via SMS per conferma prenotazione, riducendo sensibilmente i no-show, blacklist automatica per i clienti inaffidabili e calendario intelligente che ottimizza gli slot disponibili in fase di prenotazione. Reminder automatici per le prenotazioni con possibilità di disdire fino a 2 ore prima dell'inizio del taglio. Ogni negozio può integrare il widget nel proprio sito esterno mostrando recensioni e mappa della posizione. Gestione team con ruoli e permessi, upload avatar via Cloudinary, pannello admin separato e notifiche WhatsApp Business con template italiani.",
    review:
      "Il progetto più complesso che ho costruito. Dall'architettura multi-tenant al sistema di prenotazione con ottimizzazione del calendario, ogni parte ha richiesto decisioni tecniche precise. Ho gestito tutto in autonomia, dal database al deploy, dal pagamento con Stripe all'OTP via Twilio, imparando molto su scalabilità e gestione degli stati in produzione reale.",
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
    live: true,
    url: "https://h4ppykids.com",
    teaser:
      "Due e-commerce sulla stessa piattaforma, in vendita su UK, USA e Canada. Valuta convertita in tempo reale sulla geolocalizzazione, consegna dei file via Cloudflare R2 con link a scadenza.",
    highlights: [
      "Multi-valuta",
      "Stripe + PayPal",
      "Dashboard real-time",
      "Meta Pixel",
    ],
    cover: "/projects/ecommerce/globo.webp",
    stack: [
      "React",
      "Node.js",
      "Stripe",
      "PayPal",
      "Cloudflare R2",
      "WebSocket",
    ],
    description:
      "H4ppyKids e SheThrivesADHD sono due e-commerce di prodotti digitali costruiti sulla stessa piattaforma. La landing page rileva automaticamente il paese di collegamento e converte i prezzi nella valuta locale, dollari canadesi, statunitensi, sterline e altre, aggiornando il cambio in tempo reale. I pagamenti sono gestiti tramite Stripe e PayPal con supporto multi-valuta. I file digitali vengono consegnati via Cloudflare R2 con link sicuri a scadenza. La dashboard admin integra WebSocket per il monitoraggio in tempo reale degli utenti: un globo 3D illumina i pixel in base alla provenienza geografica, mostrando chi è online in quel momento, da dove arriva, la percentuale di pagina scrollata, le sezioni visualizzate e i pulsanti premuti. Meta Pixel integrato per il tracciamento delle campagne pubblicitarie.",
    review:
      "Progetto nato per testare la vendita di prodotti digitali su mercati internazionali. La parte più interessante è stata la dashboard real-time con WebSocket e il globo 3D, vedere gli utenti arrivare da tutto il mondo in diretta è stato gratificante. Ho risolto diversi bug in produzione legati alla conversione valuta sul carrello, al tracking e al traffico bot.",
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
    live: true,
    url: "https://fuxture.net",
    teaser:
      "Testata di news con CMS scritto da zero. Editor TipTap con banner e blocchi custom, gestione newsletter e auto-moderazione dei commenti prima della pubblicazione.",
    highlights: [
      "CMS custom",
      "Editor TipTap",
      "Newsletter",
      "Auto-moderazione",
    ],
    cover: "/projects/fuxture/home.webp",
    stack: ["React", "Node.js", "TipTap", "PostgreSQL", "Vercel", "Cloudflare"],
    description:
      "Fuxture è un blog con newsletter e CMS custom, nato dalla mia attività nel web marketing e nell'affiliate marketing. L'editor è basato su TipTap e permette di creare articoli ricchi con banner, immagini e formattazione avanzata direttamente dal pannello admin. Gli utenti possono registrarsi, commentare e interagire con i contenuti. I commenti passano attraverso un sistema di auto-moderazione che filtra automaticamente spam e contenuti inappropriati prima della pubblicazione. Il backend gestisce utenti, ruoli e newsletter, con deploy su Render e frontend su Vercel con Cloudflare come proxy.",
    review:
      "Progetto nato da un'esigenza reale, avevo bisogno di uno strumento mio per pubblicare contenuti legati alla mia attività di affiliate marketing senza dipendere da piattaforme esterne. Costruire il CMS da zero con TipTap è stata la parte più interessante: gestire l'output dell'editor, i blocchi personalizzati e l'upload delle immagini ha richiesto più attenzione del previsto. Il sistema di auto-moderazione dei commenti è stato un'aggiunta che ha reso il prodotto più solido.",
    buttons: [
      { label: "Fuxture", url: "https://fuxture.net", style: "secondary" },
      {
        label: "GitHub",
        url: "https://github.com/domespa/fuxture",
        style: "github",
      },
    ],
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
    live: false,
    url: "https://travel-journal-app-ten.vercel.app/",
    stack: ["React", "JavaScript", "CSS"],
    description:
      "Travel Journal è un'app React per tenere traccia dei propri viaggi. Permette di aggiungere destinazioni, annotare ricordi e organizzare il proprio diario di viaggio in modo visivo. Progetto nato da un'esigenza personale, volevo uno strumento semplice e mio per raccogliere i ricordi dei posti visitati. Interamente frontend, costruito con React e CSS.",
    review:
      "Uno dei primi progetti che ho costruito seguendo un'idea mia, non un tutorial. Piccolo ma significativo, mi ha insegnato a ragionare sulla struttura dei componenti e sulla gestione dello stato in React partendo da zero, senza un backend a supporto.",
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
    images: [
      "/projects/traveljournal/home.webp",
      "/projects/traveljournal/trip.webp",
      "/projects/traveljournal/infotrip.webp",
    ],
  },
  {
    id: "boolshop",
    name: "Boolshop",
    short: "E-commerce videogiochi, progetto di team",
    live: false,
    url: "https://fe-boolshop.vercel.app/",
    stack: ["React", "JavaScript", "CSS", "Bootstrap"],
    description:
      "Boolshop è un e-commerce di videogiochi sviluppato in team durante il bootcamp Boolean Careers. Il progetto è stato realizzato in gruppo da 4 sviluppatori con metodologia agile. Mi sono occupato principalmente del chatbot integrato, della gestione delle fetch dei dati e dell'implementazione del debounce sulla ricerca. Un progetto formativo che ha simulato il lavoro in team reale con divisione dei compiti, revisione del codice e gestione dei conflitti Git.",
    review:
      "Prima esperienza di sviluppo in team, presentata come progetto finale del bootcamp Boolean Careers. Lavorare in quattro sullo stesso codebase ha insegnato tanto quanto il codice stesso: comunicazione, Git flow, revisione del codice e rispetto delle scadenze. Il chatbot è stato la parte più stimolante, gestire i flussi di conversazione e integrarli con i dati del catalogo è stata una bella sfida per il livello in cui eravamo.",
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
    live: false,
    url: "https://progetto-finale-spec-frontend-front-jade.vercel.app/",
    stack: ["React", "JavaScript", "CSS"],
    description:
      "Progetto individuale sviluppato per l'esame di specializzazione del bootcamp Boolean Careers. Presentato durante la valutazione finale, è stato utile per consolidare la gestione dello stato in React con liste dinamiche e confronti multipli. Semplice nella struttura ma efficace per capire come organizzare dati comparativi in modo leggibile per l'utente.",
    review:
      "Progetto individuale sviluppato per l'esame di specializzazione del bootcamp Boolean Careers. Presentato durante la valutazione finale, è stato utile per consolidare la gestione dello stato in React con liste dinamiche e confronti multipli. Semplice nella struttura ma efficace per capire come organizzare dati comparativi in modo leggibile per l'utente.",
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
    images: [
      "/projects/techbool/prod.webp",
      "/projects/techbool/compara.webp",
      "/projects/techbool/pref.webp",
    ],
  },
];

export const LIVE_PROJECTS = PROJECTS.filter((p) => p.live);

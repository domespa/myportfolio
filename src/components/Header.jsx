import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }

    let ticking = false;
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.9;
      setIsVisible(window.scrollY > triggerPoint);
    };

    const optimizedScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", optimizedScroll);
    return () => window.removeEventListener("scroll", optimizedScroll);
  }, [isHomePage]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/progetti", label: "Progetti" },
    { to: "/contatti", label: "Contatti" },
  ];

  return (
    <div className={`header-container ${isVisible ? "visible" : ""}`}>
      <header>
        {/* LOGO / BRAND */}
        <Link to="/" className="header-logo" aria-label="Torna alla home">
          <span className="header-logo-bracket">&lt;</span>
          DS
          <span className="header-logo-bracket">/&gt;</span>
        </Link>

        {/* NAV */}
        <nav>
          <ul>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={location.pathname === to ? "active" : ""}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CV DOWNLOAD */}
        <a
          href="/cv-domenico-spampinato.pdf"
          download
          className="header-cv-btn"
          aria-label="Scarica il mio CV"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>CV</span>
        </a>
      </header>
    </div>
  );
}

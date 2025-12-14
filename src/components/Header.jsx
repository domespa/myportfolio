import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Determina se siamo nella home page
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    // Se NON siamo nella home, mostra sempre l'header
    if (!isHomePage) {
      setIsVisible(true);
      return;
    }

    // Se siamo nella home, mostra l'header solo dopo lo scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = window.innerHeight * 0.9;

      if (scrollPosition > triggerPoint) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Ottimizzazione performance con requestAnimationFrame
    let ticking = false;
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

  return (
    <div className={`header-container ${isVisible ? "visible" : ""}`}>
      <header>
        <nav>
          <ul>
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/progetti"
                className={location.pathname === "/progetti" ? "active" : ""}
              >
                Progetti
              </Link>
            </li>
            <li>
              <Link
                to="/contatti"
                className={location.pathname === "/contatti" ? "active" : ""}
              >
                Contatti
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

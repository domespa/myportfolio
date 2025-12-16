import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const canvasRef = useRef(null);
  const [typedName, setTypedName] = useState("");
  const [typedRole, setTypedRole] = useState("");
  const [showCTA, setShowCTA] = useState(false);
  const [matrixEnabled, setMatrixEnabled] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // NO SU MOBILE
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setMatrixEnabled(false);
      return;
    }

    const ctx = canvas.getContext("2d", { alpha: false });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    let animationId;

    function draw() {
      ctx.fillStyle = "rgba(10, 14, 39, 0.03)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#22c55e";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fullName = "Domenico Spampinato";
    const fullRole = "Full-Stack Developer";

    let nameIndex = 0;
    let roleIndex = 0;

    const typeWriterName = () => {
      if (nameIndex < fullName.length) {
        setTypedName(fullName.slice(0, nameIndex + 1));
        nameIndex++;
        setTimeout(typeWriterName, 100);
      } else {
        setTimeout(typeWriterRole, 400);
      }
    };

    const typeWriterRole = () => {
      if (roleIndex < fullRole.length) {
        setTypedRole(fullRole.slice(0, roleIndex + 1));
        roleIndex++;
        setTimeout(typeWriterRole, 50);
      } else {
        setTimeout(() => setShowCTA(true), 300);
      }
    };

    setTimeout(typeWriterName, 300);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.offsetTop - headerOffset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="hero-container">
      {matrixEnabled && (
        <canvas
          ref={canvasRef}
          className="matrix-canvas"
          aria-hidden="true"
        ></canvas>
      )}

      <div className="hero" role="banner">
        <div className="hero-box">
          <h1 aria-label="Nome: Domenico Spampinato">
            <span className="typed-name">{typedName}</span>
            <span className="cursor" aria-hidden="true"></span>
          </h1>

          <p className="hero-subtitle" aria-live="polite">
            <span className="typed-role">{typedRole}</span>
          </p>

          {showCTA && (
            <div className="hero-cta">
              <button
                onClick={() => scrollToSection("about-section")}
                className="hero-btn hero-btn-primary"
                aria-label="Scopri le mie competenze"
              >
                <span>Scopri di più</span>
                <svg
                  className="btn-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </button>
            </div>
          )}

          {showCTA && (
            <div className="hero-social">
              <a
                href="https://github.com/domespa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visita il mio profilo GitHub"
                className="social-link"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/domespa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visita il mio profilo LinkedIn"
                className="social-link"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

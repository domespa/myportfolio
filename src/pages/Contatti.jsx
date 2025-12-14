import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contatti() {
  const renderParticles = () => {
    const particles = [];
    for (let i = 1; i <= 15; i++) {
      let className = "particle ";
      if (i % 3 === 0) {
        className += "particle-large";
      } else if (i % 2 === 0) {
        className += "particle-medium";
      } else {
        className += "particle-small";
      }
      particles.push(<div key={i} className={className}></div>);
    }
    return particles;
  };

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    oggetto: "",
    messaggio: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.nome,
          from_email: formData.email,
          subject: formData.oggetto,
          message: formData.messaggio,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("✅ Email inviata!", result);

      setStatus({ loading: false, success: true, error: "" });
      setFormData({ nome: "", email: "", oggetto: "", messaggio: "" });

      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      console.error("❌ Errore invio email:", error);
      setStatus({
        loading: false,
        success: false,
        error: "Errore durante l'invio. Riprova più tardi.",
      });
    }
  };

  return (
    <div className="contatti-section">
      {renderParticles()}

      <div className="contatti-container">
        <div className="contatti-header">
          <p>Hai un progetto in mente? Parliamone!</p>
        </div>

        <div className="contatti-content">
          <div className="contatti-info">
            <h3>Informazioni di Contatto</h3>

            <div className="info-item">
              <div className="info-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <a href="mailto:domespampinato@gmail.com">
                  domespampinato@gmail.com
                </a>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h4>Località</h4>
                <p>Carlentini, Sicilia, Italia</p>
              </div>
            </div>

            <div className="social-links">
              <h4>Seguimi</h4>
              <div className="social-icons">
                <a
                  href="https://github.com/domespa"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
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
                  aria-label="LinkedIn"
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
                <a
                  href="https://www.facebook.com/dumiii8"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zm-3 7h-1.75c-1.381 0-1.75.656-1.75 1.625v2.125h3.25l-.375 3h-2.875V24h-3v-10h-2v-3h2V8.5C9.5 5.875 11.156 4 13.75 4c1.25 0 2.25.094 2.5.125V7z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="contatti-form-wrapper">
            <h3>Inviami un Messaggio</h3>

            <form onSubmit={handleSubmit} className="contatti-form">
              <div className="form-group">
                <label htmlFor="nome">Nome *</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  placeholder="Il tuo nome"
                  disabled={status.loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tua@email.com"
                  disabled={status.loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="oggetto">Oggetto *</label>
                <input
                  type="text"
                  id="oggetto"
                  name="oggetto"
                  value={formData.oggetto}
                  onChange={handleChange}
                  required
                  placeholder="Di cosa vuoi parlare?"
                  disabled={status.loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="messaggio">Messaggio *</label>
                <textarea
                  id="messaggio"
                  name="messaggio"
                  value={formData.messaggio}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Scrivi qui il tuo messaggio..."
                  disabled={status.loading}
                />
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={status.loading}
              >
                {status.loading ? (
                  <>
                    <span className="spinner"></span>
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    Invia Messaggio
                  </>
                )}
              </button>

              {status.success && (
                <div className="alert alert-success">
                  ✅ Messaggio inviato con successo! Ti risponderò presto.
                </div>
              )}

              {status.error && (
                <div className="alert alert-error">❌ {status.error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

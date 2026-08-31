import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../style/skills.css";

gsap.registerPlugin(ScrollTrigger);
const CATEGORIES = [
  {
    key: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", icon: "/icon/react.png" },
      { name: "Next.js", icon: "/icon/nextjs.png" },
      { name: "TypeScript", icon: "/icon/ts.png" },
      { name: "JavaScript", icon: "/icon/js.png" },
      { name: "HTML", icon: "/icon/html.png" },
      { name: "CSS", icon: "/icon/css.png" },
      { name: "Tailwind", icon: "/icon/tailwind.png" },
      { name: "Bootstrap", icon: "/icon/bootstrap.png" },
    ],
  },
  {
    key: "backend",
    label: "Backend",
    skills: [
      { name: "Node.js", icon: "/icon/nodejs.png" },
      { name: "Express", icon: "/icon/express.png" },
      { name: "PHP", icon: "/icon/php.png" },
      { name: "Laravel", icon: "/icon/laravel.png" },
      { name: "JWT", icon: "/icon/jwt.png" },
      { name: "WebSocket", icon: "/icon/websocket.png" },
    ],
  },
  {
    key: "database",
    label: "Database",
    skills: [
      { name: "PostgreSQL", icon: "/icon/pgadmin.png" },
      { name: "MySQL", icon: "/icon/mysql.png" },
      { name: "Prisma", icon: "/icon/prisma.png" },
      { name: "Supabase", icon: "/icon/supabase.png" },
    ],
  },
  {
    key: "tools",
    label: "Tools & DevOps",
    skills: [
      { name: "Git", icon: "/icon/git.png" },
      { name: "GitHub", icon: "/icon/github.png" },
      { name: "Vercel", icon: "/icon/vercel.png" },
      { name: "Netlify", icon: "/icon/netlify.png" },
      { name: "Postman", icon: "/icon/postman.png" },
      { name: "VS Code", icon: "/icon/vs.png" },
      { name: "Workbench", icon: "/icon/workbench.png" },
      { name: "Jest", icon: "/icon/jest.png" },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Vedi About.jsx: GSAP e' JS, il blocco CSS non lo tocca.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ANIMAZIONE PER OGNI CATEGORIA IN SEQUENZA
    el.querySelectorAll(".skills-category").forEach((cat, i) => {
      gsap.fromTo(
        cat,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: { trigger: cat, start: "top 82%" },
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        cat.querySelectorAll(".skill-badge"),
        { opacity: 0, scale: 0.9 },
        {
          scrollTrigger: { trigger: cat, start: "top 82%" },
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.05,
          delay: i * 0.08 + 0.15,
          ease: "back.out(1.4)",
        },
      );
    });
  }, []);

  return (
    <section id="skills" className="skills-sect" ref={sectionRef}>
      <div className="skills-inner">
        {/* HEADER */}
        <div className="skills-header">
          <p className="mono-label">Stack</p>
          <h2 className="skills-title">Tecnologie</h2>
          <p className="skills-subtitle">
            Strumenti che uso per costruire prodotti reali
          </p>
        </div>

        {/* CATEGORIE */}
        <div className="skills-categories">
          {CATEGORIES.map(({ key, label, skills }) => (
            <div className="skills-category" key={key}>
              <h3 className="skills-cat-label">{label}</h3>
              <div className="skills-grid">
                {skills.map(({ name, icon }) => (
                  <div className="skill-badge" key={name}>
                    <img
                      src={icon}
                      alt={name}
                      className="skill-badge-icon"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <span className="skill-badge-name">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

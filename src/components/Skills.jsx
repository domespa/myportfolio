import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const RADIUS = 50;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  useEffect(() => {
    const containers = document.querySelectorAll(".cardskills-container");

    containers.forEach((container) => {
      const skills = container.querySelectorAll(".skill-card");

      skills.forEach((skill) => {
        const circle = skill.querySelector(".progress-ring-fill");
        const level = parseInt(skill.dataset.level);
        const offset = CIRCUMFERENCE - (CIRCUMFERENCE * level) / 100;

        gsap.fromTo(
          circle,
          {
            strokeDashoffset: CIRCUMFERENCE,
          },
          {
            scrollTrigger: {
              trigger: skill,
              start: "top 80%",
            },
            strokeDashoffset: offset,
            duration: 2,
            ease: "power2.out",
          }
        );
      });

      // Anima le card
      gsap.fromTo(
        skills,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
          rotation: -10,
        },
        {
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );
    });
  }, []);

  const skillsData = {
    frontend: [
      { name: "HTML", icon: "./icon/html.png", level: 95 },
      { name: "CSS", icon: "./icon/css.png", level: 93 },
      { name: "JavaScript", icon: "./icon/js.png", level: 85 },
      { name: "TypeScript", icon: "./icon/ts.png", level: 80 },
    ],
    framework: [
      { name: "React", icon: "./icon/react.png", level: 96 },
      { name: "Bootstrap", icon: "./icon/bootstrap.png", level: 88 },
      { name: "Tailwind CSS", icon: "./icon/tailwind.png", level: 87 },
      { name: "Next.js", icon: "./icon/nextjs.png", level: 80 },
      { name: "Laravel", icon: "./icon/laravel.png", level: 45 },
    ],
    backend: [
      { name: "Node.js", icon: "./icon/nodejs.png", level: 85 },
      { name: "MySQL", icon: "./icon/mysql.png", level: 86 },
      { name: "Prisma", icon: "./icon/prisma.png", level: 85 },
      { name: "Supabase", icon: "./icon/supabase.png", level: 83 },
      { name: "REST API", icon: "./icon/api.png", level: 84 },
      { name: "JWT", icon: "./icon/jwt.png", level: 82 },
      { name: "WebSocket", icon: "./icon/websocket.png", level: 70 },
      { name: "PHP", icon: "./icon/php.png", level: 45 },
    ],
    tools: [
      { name: "VS Code", icon: "./icon/vs.png", level: 99 },
      { name: "GitHub", icon: "./icon/github.png", level: 99 },
      { name: "Postman", icon: "./icon/postman.png", level: 99 },
      { name: "Git", icon: "./icon/git.png", level: 92 },
      { name: "pgAdmin", icon: "./icon/pgadmin.png", level: 80 },
      { name: "Jest", icon: "./icon/jest.png", level: 65 },
    ],
  };

  const categories = [
    { key: "frontend", title: "Frontend & Linguaggi" },
    { key: "framework", title: "Framework & Librerie" },
    { key: "backend", title: "Backend & Database" },
    { key: "tools", title: "Tools & Development" },
  ];

  // PARTICELLE
  const renderParticles = () => {
    const particles = [];
    for (let i = 1; i <= 50; i++) {
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

  return (
    <div className="skill-sect">
      {renderParticles()}

      <div id="skills" className="skills-container">
        <h2>Skills</h2>
        <div className="skills-wrapper">
          {categories.map((category) => (
            <div className="cardskills-container" key={category.key}>
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-grid">
                {skillsData[category.key].map((skill, skillIndex) => {
                  const gradientId = `gradient-${category.key}-${skillIndex}`;

                  return (
                    <div
                      className="skill-card"
                      key={skillIndex}
                      data-level={skill.level}
                    >
                      <div className="progress-ring">
                        <svg width="120" height="120" viewBox="0 0 120 120">
                          <defs>
                            <linearGradient
                              id={gradientId}
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                style={{ stopColor: "#4ade80", stopOpacity: 1 }}
                              />
                              <stop
                                offset="100%"
                                style={{ stopColor: "#22d3ee", stopOpacity: 1 }}
                              />
                            </linearGradient>
                          </defs>
                          <circle
                            className="progress-ring-bg"
                            cx="60"
                            cy="60"
                            r="50"
                          />
                          <circle
                            className="progress-ring-fill"
                            cx="60"
                            cy="60"
                            r="50"
                            style={{
                              stroke: `url(#${gradientId})`,
                              strokeDasharray: CIRCUMFERENCE,
                            }}
                          />
                        </svg>
                        <div className="progress-content">
                          <div className="skill-icon-circular">
                            <img src={skill.icon} alt={skill.name} />
                          </div>
                          <div className="progress-value">{skill.level}%</div>
                        </div>
                      </div>
                      <h4>{skill.name}</h4>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

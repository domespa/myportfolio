import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  const canvasRef = useRef(null);
  const [typedName, setTypedName] = useState("");
  const [typedRole, setTypedRole] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Matrix Effect
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      ctx.fillStyle = "rgba(10, 14, 39, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#4ade80";
      ctx.font = fontSize + "px monospace";

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    }

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const fullName = "Domenico Spampinato";
    let nameIndex = 0;

    const typeWriterName = () => {
      if (nameIndex < fullName.length) {
        setTypedName(fullName.slice(0, nameIndex + 1));
        nameIndex++;
        setTimeout(typeWriterName, 150);
      } else {
        setTimeout(() => typeWriterRole(), 1500);
      }
    };

    const fullRole = "Full-Stack Web Developer";
    let roleIndex = 0;

    const typeWriterRole = () => {
      if (roleIndex < fullRole.length) {
        setTypedRole(fullRole.slice(0, roleIndex + 1));
        roleIndex++;
        setTimeout(typeWriterRole, 100);
      } else {
        setTimeout(() => setShowButton(true), 500);
      }
    };

    setTimeout(typeWriterName, 500);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToSect = () => {
    document.getElementById("skills").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="hero-container">
      <canvas ref={canvasRef} className="matrix-canvas"></canvas>
      <div className="hero">
        <div className="hero-box">
          <h1>
            <span className="typed-name">{typedName}</span>
            <span className="cursor"></span>
          </h1>
          <p>
            <span className="typed-role">{typedRole}</span>
          </p>
          {showButton && (
            <button onClick={scrollToSect} className="hero-btn">
              Scopri di più <FontAwesomeIcon icon={faArrowDown} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

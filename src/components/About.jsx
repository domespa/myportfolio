import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function About() {
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(buttonRef.current, {
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  const scrollToSect = () => {
    document.getElementById("skills").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div id="about" className="about-section">
      <div className="pict">
        <img src="./foto.png" alt="foto" />
      </div>

      <div className="about-content">
        <div className="about-container">
          <h2>Ciao, sono Domenico.</h2>
          <p>
            La programmazione mi appassiona da quando avevo 15 anni.
            <br />
            Da qualche anno ho deciso di trasformare questa passione in
            mestiere.
            <br />
            Ho frequentato la classe #138 di <strong>Boolean</strong>, corso di
            600 ore con obbligo di presenza la mattina ed esercitazione il
            pomeriggio.
            <br />
            Ho conseguito l'attestato specializzandomi in{" "}
            <strong>TypeScript</strong> e componenti avanzati di{" "}
            <strong>React.</strong>
          </p>
          <p>
            Oggi lavoro come <strong>full-stack developer.</strong>
            <br />
            Realizzo web app responsive con interfacce moderne e architetture
            scalabili.
          </p>
        </div>

        <button ref={buttonRef} onClick={scrollToSect} className="hero-btn">
          Le mie Skills <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
    </div>
  );
}

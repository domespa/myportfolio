import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: "power3.out",
    })
      .from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 50,
          duration: 0.8,
        },
        "-=0.5"
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );
  }, []);

  const scrollToSect = () => {
    document.getElementById("about").scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div className="hero-container">
      <div className="hero">
        <h1 ref={titleRef}>DOMENICO SPAMPINATO</h1>
        <p ref={subtitleRef}>WEB DEVELOPER</p>
        <button ref={buttonRef} onClick={scrollToSect} className="hero-btn">
          Chi Sono <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
    </div>
  );
}

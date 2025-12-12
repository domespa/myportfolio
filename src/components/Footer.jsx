import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer>
      <div className="foot-cont">
        <div className="left-foot">
          <div className="foot-img">
            <img src="/foto.png" alt="foto" />
          </div>
          <div>
            <h2>Ciao, sono Domenico.</h2>
            <p>
              La programmazione mi appassiona da quando avevo 15 anni.
              <br />
              Da qualche anno ho deciso di trasformare questa passione in
              mestiere.
              <br />
              Ho frequentato la classe #138 di <strong>Boolean</strong>, corso
              di 600 ore con obbligo di presenza la mattina ed esercitazione il
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
        </div>
        <div className="right-foot">
          <h3>Contatti</h3>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/progetti">Progetti</Link>
              </li>
              <li>
                <Link to="/contattami">Contattami</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <hr />
      <div className="foot-foot">
        <p>© 2025 Domenico Spampinato. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
}

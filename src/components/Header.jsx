import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header-container">
      <header>
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
      </header>
    </div>
  );
}

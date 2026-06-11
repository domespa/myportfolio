import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./style/index.css";
import "./style/hero.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>,
);

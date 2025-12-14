import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import ScrollToTop from "./components/ScrolltoTop.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);

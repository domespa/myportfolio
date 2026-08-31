import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Progetti from "./pages/Progetti";
import Contatti from "./pages/Contatti";
import ChatWidget from "./components/ChatWidget";

export default function App() {
  const { pathname } = useLocation();
  // /progetti naviga con la propria sidebar: l'header globale la duplicherebbe.
  const conHeader = pathname !== "/progetti";

  return (
    <>
      {conHeader && <Header />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/progetti" element={<Progetti />} />
        <Route path="/contatti" element={<Contatti />} />
      </Routes>
      <ChatWidget />
    </>
  );
}

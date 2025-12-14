// IMPORT
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import Progetti from "./pages/Progetti";
import Footer from "./components/Footer";
import Contatti from "./pages/Contatti";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/progetti" element={<Progetti />} />
        <Route path="/contatti" element={<Contatti />} />
      </Routes>
      <Footer />
    </>
  );
}

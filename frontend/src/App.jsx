import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Registro from "./pages/registro";
import AgendaLocal from "./pages/agenda-local";
import DatosReserva from "./pages/datos-reserva";
import CitaConfirmada from "./pages/cita-confirmada";
import MisCitas from "./pages/mis-citas";
import Explorar from "./pages/explorar";
import BarberiaPerfil from "./pages/barberia-perfil";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/barberia/:id" element={<BarberiaPerfil />} />
        <Route path="/agenda-local" element={<AgendaLocal />} />
        <Route path="/datos-reserva" element={<DatosReserva />} />
        <Route path="/cita-confirmada" element={<CitaConfirmada />} />
        <Route path="/mis-citas" element={<MisCitas />} />
      </Routes>
    </BrowserRouter>
  );
}
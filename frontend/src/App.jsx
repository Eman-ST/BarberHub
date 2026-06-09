import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Registro from "./pages/registro";
import VerificarCorreo from "./pages/verificar-correo";
import AgendaLocal from "./pages/agenda-local";
import DatosReserva from "./pages/datos-reserva";
import CitaConfirmada from "./pages/cita-confirmada";
import MisCitas from "./pages/mis-citas";
import Explorar from "./pages/explorar";
import BarberiaPerfil from "./pages/barberia-perfil";
import MasServicios from "./pages/mas-servicios";
import RecuperarPassword from "./pages/recuperar-password";
import RecuperarPasswordEnviado from "./pages/recuperar-password-enviado";
import RestablecerPassword from "./pages/restablecer-password";
import RestablecerPasswordExito from "./pages/restablecer-password-exito";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/verificar-correo" element={<VerificarCorreo />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/barberia/:id" element={<BarberiaPerfil />} />
        <Route path="/barberia/:id/servicios" element={<MasServicios />} />
        <Route path="/agenda-local" element={<AgendaLocal />} />
        <Route path="/datos-reserva" element={<DatosReserva />} />
        <Route path="/cita-confirmada" element={<CitaConfirmada />} />
        <Route path="/mis-citas" element={<MisCitas />} />
        <Route path="/recuperar-password" element={<RecuperarPassword />} />
        <Route path="/recuperar-password-enviado" element={<RecuperarPasswordEnviado />} />
        <Route path="/restablecer-password" element={<RestablecerPassword />} />
        <Route path="/restablecer-password-exito" element={<RestablecerPasswordExito />} />
      </Routes>
    </BrowserRouter>
  );
}
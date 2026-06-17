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
import OpinionBarberia from "./pages/opinion-barberia";
import OpinionBarbero from "./pages/opinion-barbero";
import HistorialCitas from "./pages/historial-citas";
import Favoritos from "./pages/favoritos";
import Notificaciones from "./pages/notificaciones";
import Ajustes from "./pages/ajustes";
import OpinionBarberiaGeneral from "./pages/opinion-barberia-general";
import ComentarioEnviado from "./pages/comentario-enviado";
import OwnerFinanzas from "./pages/owner/owner-finanzas";

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
        <Route path="/opinion-barberia" element={<OpinionBarberia />} />
        <Route path="/opinion-barbero" element={<OpinionBarbero />} />
        <Route path="/historial-citas" element={<HistorialCitas />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/ajustes" element={<Ajustes />} />
        <Route path="/opinion-barberia-general" element={<OpinionBarberiaGeneral />} />
        <Route path="/comentario-enviado" element={<ComentarioEnviado />} />
        <Route path="/owner/finanzas" element={<OwnerFinanzas />} />
      </Routes>
    </BrowserRouter>
  );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Registro from "./pages/registro";
import VerificarCorreo from "./pages/verificar-correo";
import AgendaLocal from "./pages/agenda-local";
import DatosReserva from "./pages/datos-reserva";
import CitaConfirmada from "./pages/cita-confirmada";
import MisCitas from "./pages/MisCitas";
import Explorar from "./pages/explorar";
import BarberiaPerfil from "./pages/barberia-perfil";
import MasServicios from "./pages/mas-servicios";
import DetalleCita from "./pages/detalle-cita";
import RecuperarPassword from "./pages/recuperar-password";
import RecuperarPasswordEnviado from "./pages/recuperar-password-enviado";
import RestablecerPassword from "./pages/restablecer-password";
import RestablecerPasswordExito from "./pages/restablecer-password-exito";
import SidebarLayout from "./components/sidebar-layout";
import OpinionBarberia from "./pages/opinion-barberia";
import OpinionBarbero from "./pages/opinion-barbero";
import HistorialCitas from "./pages/historial-citas";
import Favoritos from "./pages/favoritos";
import Notificaciones from "./pages/notificaciones";
import Ajustes from "./pages/ajustes";
import OpinionBarberiaGeneral from "./pages/opinion-barberia-general";
import ComentarioEnviado from "./pages/comentario-enviado";
import OwnerFinanzas from "./pages/owner/owner-finanzas";
import PagoAnticipo from "./pages/pago-anticipo";

function AuthLayout({ children }) {
  return <SidebarLayout>{children}</SidebarLayout>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas (sin sidebar) */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/verificar-correo" element={<VerificarCorreo />} />
        <Route path="/recuperar-password" element={<RecuperarPassword />} />
        <Route
          path="/recuperar-password-enviado"
          element={<RecuperarPasswordEnviado />}
        />
        <Route
          path="/restablecer-password"
          element={<RestablecerPassword />}
        />
        <Route
          path="/restablecer-password-exito"
          element={<RestablecerPasswordExito />}
        />

        {/* Rutas con sidebar */}
        <Route
          path="/explorar"
          element={
            <AuthLayout>
              <Explorar />
            </AuthLayout>
          }
        />

        <Route
          path="/barberia/:id"
          element={
            <AuthLayout>
              <BarberiaPerfil />
            </AuthLayout>
          }
        />

        <Route
          path="/barberia/:id/servicios"
          element={
            <AuthLayout>
              <MasServicios />
            </AuthLayout>
          }
        />

        <Route
          path="/agenda-local"
          element={
            <AuthLayout>
              <AgendaLocal />
            </AuthLayout>
          }
        />

        <Route
          path="/datos-reserva"
          element={
            <AuthLayout>
              <DatosReserva />
            </AuthLayout>
          }
        />

        <Route
          path="/cita-confirmada"
          element={
            <AuthLayout>
              <CitaConfirmada />
            </AuthLayout>
          }
        />

        <Route
          path="/mis-citas"
          element={
            <AuthLayout>
              <MisCitas />
            </AuthLayout>
          }
        />

        <Route
          path="/cita/:id"
          element={
            <AuthLayout>
              <DetalleCita />
            </AuthLayout>
          }
        />

        <Route
          path="/opinion-barberia"
          element={
            <AuthLayout>
              <OpinionBarberia />
            </AuthLayout>
          }
        />

        <Route
          path="/opinion-barbero"
          element={
            <AuthLayout>
              <OpinionBarbero />
            </AuthLayout>
          }
        />

        <Route
          path="/historial-citas"
          element={
            <AuthLayout>
              <HistorialCitas />
            </AuthLayout>
          }
        />

        <Route
          path="/favoritos"
          element={
            <AuthLayout>
              <Favoritos />
            </AuthLayout>
          }
        />

        <Route
          path="/notificaciones"
          element={
            <AuthLayout>
              <Notificaciones />
            </AuthLayout>
          }
        />

        <Route
          path="/ajustes"
          element={
            <AuthLayout>
              <Ajustes />
            </AuthLayout>
          }
        />

        <Route
          path="/opinion-barberia-general"
          element={
            <AuthLayout>
              <OpinionBarberiaGeneral />
            </AuthLayout>
          }
        />

        <Route
          path="/comentario-enviado"
          element={
            <AuthLayout>
              <ComentarioEnviado />
            </AuthLayout>
          }
        />

        <Route
          path="/owner-finanzas"
          element={
            <AuthLayout>
              <OwnerFinanzas />
            </AuthLayout>
          }
        />

        <Route
          path="/pago-anticipo"
          element={
            <AuthLayout>
              <PagoAnticipo />
            </AuthLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
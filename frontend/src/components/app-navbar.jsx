import { useNavigate } from "react-router-dom";
import "../styles/app-navbar.css";

export default function AppNavbar({ showAgendaLocal = false }) {
  const navigate = useNavigate();

  return (
    <nav className="app-navbar">
      <button
        type="button"
        className="app-nav-logo-btn"
        onClick={() => navigate("/")}
        aria-label="Ir al inicio"
      >
        <img
          className="app-nav-logo-img"
          src="/barberhublogo.jpg"
          alt="Barber Hub"
        />
      </button>

      <div className="app-nav-actions">
        {showAgendaLocal && (
          <button
            type="button"
            className="app-btn-outline"
            onClick={() => navigate("/agenda-local")}
          >
            Agenda en local
          </button>
        )}
        <button
          type="button"
          className="app-btn-outline"
          onClick={() => navigate("/explorar")}
        >
          Buscar barberías
        </button>
        <button
          type="button"
          className="app-btn-gold"
          onClick={() => navigate("/login")}
        >
          Iniciar sesión
        </button>
      </div>
    </nav>
  );
}

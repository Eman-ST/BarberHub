import { useNavigate, useParams } from "react-router-dom";
import {
  IconMapPin,
  IconCalendar,
  IconScissors,
  IconStarFilled,
  IconUser,
  IconMoustache,
  IconRazor,
  IconChevronRight,
} from "@tabler/icons-react";
import AppNavbar from "../components/app-navbar";
import { getBarberiaById } from "../data/barberias";
import "../styles/barberia-perfil.css";

const ICONOS_SERVICIO = {
  moustache: IconMoustache,
  razor: IconRazor,
  user: IconUser,
  scissors: IconScissors,
};

function Estrellas({ count = 5 }) {
  return (
    <span className="bp-stars" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <IconStarFilled key={i} size={16} />
      ))}
    </span>
  );
}

export default function BarberiaPerfil() {
  const { id } = useParams();
  const navigate = useNavigate();
  const barberia = getBarberiaById(id);

  const abrirMapa = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${barberia.lat},${barberia.lng}`;
    window.open(url, "_blank", "noopener,noreferrer");
    // TODO: reemplazar por marcador en mapa embebido (Google Maps JS API)
  };

  const agendarCita = () => {
    navigate("/agenda-local", { state: { barberiaId: barberia.id } });
  };

  return (
    <div className="bp-page">
      <AppNavbar />

      <main className="bp-main">
        {/* Tarjeta principal */}
        <section className="bp-hero" aria-label={`Perfil de ${barberia.nombre}`}>
          <div className="bp-hero-left">
            <img
              className="bp-hero-logo"
              src={barberia.imagen}
              alt=""
            />
            <div className="bp-hero-info">
              <h1 className="bp-hero-title">{barberia.nombre}</h1>
              <div className="bp-hero-rating">
                <Estrellas />
                <span>
                  {barberia.rating.toFixed(1)} ({barberia.totalOpiniones}{" "}
                  opiniones)
                </span>
              </div>
              <p className="bp-hero-address">
                <IconMapPin size={16} stroke={2} />
                {barberia.direccion}
              </p>
              <p className="bp-hero-status">
                <span
                  className={`bp-status-dot ${barberia.abierto ? "bp-status-dot--open" : ""}`}
                  aria-hidden
                />
                {barberia.abierto ? "Abierto ahora" : "Cerrado"}
              </p>
            </div>
          </div>

          <div className="bp-hero-actions">
            <button type="button" className="bp-btn-map" onClick={abrirMapa}>
              <IconMapPin size={18} stroke={2} />
              Ver en el mapa
            </button>
            <button type="button" className="bp-btn-book" onClick={agendarCita}>
              <IconCalendar size={18} stroke={2} />
              Agendar cita
            </button>
          </div>
        </section>

        {/* Tres columnas */}
        <div className="bp-grid">
          {/* Servicios */}
          <section className="bp-panel">
            <header className="bp-panel-head">
              <IconScissors size={22} stroke={1.8} className="bp-panel-icon bp-panel-icon--gold" />
              <h2>Servicios</h2>
            </header>
            <ul className="bp-service-list">
              {barberia.servicios.map((s) => {
                const Icon = ICONOS_SERVICIO[s.icono] ?? IconScissors;
                return (
                  <li key={s.id} className="bp-service-item">
                    <span className="bp-service-left">
                      <Icon size={22} stroke={1.5} />
                      {s.nombre}
                    </span>
                    <span className="bp-service-price">${s.precio}</span>
                  </li>
                );
              })}
            </ul>
            <button type="button" className="bp-btn-more">
              Ver más servicios
            </button>
          </section>

          {/* Barberos */}
          <section className="bp-panel">
            <header className="bp-panel-head">
              <IconUser size={22} stroke={1.8} className="bp-panel-icon" />
              <h2>Barberos</h2>
            </header>
            <ul className="bp-barber-list">
              {barberia.barberos.map((b) => (
                <li key={b.id} className="bp-barber-item">
                  <img
                    className="bp-barber-photo"
                    src={b.foto}
                    alt={b.nombre}
                    loading="lazy"
                  />
                  <div>
                    <div className="bp-barber-name">{b.nombre}</div>
                    <div className="bp-barber-rating">
                      <IconStarFilled size={14} />
                      {b.rating.toFixed(1)}{" "}
                      <span className="bp-barber-reviews">({b.opiniones})</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Opiniones */}
          <section className="bp-panel">
            <header className="bp-panel-head">
              <IconStarFilled size={24} className="bp-panel-icon bp-panel-icon--gold" />
              <h2>Opiniones</h2>
            </header>
            <ul className="bp-review-list">
              {barberia.opiniones.map((texto, i) => (
                <li key={i} className="bp-review-item">
                  <IconChevronRight size={16} className="bp-review-chevron" />
                  <p>{texto}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

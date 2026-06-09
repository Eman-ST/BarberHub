import { useNavigate, useParams } from "react-router-dom";
import {
  IconMapPin,
  IconStarFilled,
  IconScissors,
  IconMoustache,
  IconRazor,
  IconUser,
  IconChevronLeft,
} from "@tabler/icons-react";
import AppNavbar from "../components/app-navbar";
import { getBarberiaById } from "../data/barberias";
import "../styles/mas-servicios.css";

const ICONOS_SERVICIO = {
  moustache: IconMoustache,
  razor: IconRazor,
  user: IconUser,
  scissors: IconScissors,
};

function Estrellas({ count = 5 }) {
  return (
    <span className="ms-stars" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <IconStarFilled key={i} size={16} />
      ))}
    </span>
  );
}

export default function MasServicios() {
  const navigate = useNavigate();
  const { id } = useParams();
  const barberia = getBarberiaById(id);

  const servicios = barberia.serviciosExtendidos ?? barberia.servicios;
  const mitad = Math.ceil(servicios.length / 2);
  const colA = servicios.slice(0, mitad);
  const colB = servicios.slice(mitad);

  return (
    <div className="ms-page">
      <AppNavbar />

      <main className="ms-main">
        <section className="ms-hero">
          <div className="ms-hero-left">
            <img className="ms-hero-logo" src={barberia.imagen} alt="" />
            <div>
              <h1 className="ms-hero-title">{barberia.nombre}</h1>
              <div className="ms-hero-rating">
                <Estrellas />
                <span>
                  {barberia.rating.toFixed(1)} ({barberia.totalOpiniones} opiniones)
                </span>
              </div>
              <p className="ms-hero-address">
                <IconMapPin size={17} />
                {barberia.direccion}
              </p>
              <p className="ms-hero-status">
                <span
                  className={`ms-status-dot ${barberia.abierto ? "ms-status-dot--open" : ""}`}
                />
                {barberia.abierto ? "Abierto ahora" : "Cerrado"}
              </p>
            </div>
          </div>
        </section>

        <section className="ms-services">
          <h2>Servicios disponibles</h2>

          <div className="ms-services-grid">
            <ul className="ms-services-col">
              {colA.map((s) => {
                const Icon = ICONOS_SERVICIO[s.icono] ?? IconScissors;
                return (
                  <li key={s.id} className="ms-service-item">
                    <span className="ms-service-left">
                      <Icon size={22} stroke={1.7} />
                      {s.nombre}
                    </span>
                    <span className="ms-service-price">${s.precio}</span>
                  </li>
                );
              })}
            </ul>

            <ul className="ms-services-col">
              {colB.map((s) => {
                const Icon = ICONOS_SERVICIO[s.icono] ?? IconScissors;
                return (
                  <li key={s.id} className="ms-service-item">
                    <span className="ms-service-left">
                      <Icon size={22} stroke={1.7} />
                      {s.nombre}
                    </span>
                    <span className="ms-service-price">${s.precio}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="ms-actions">
            <button
              type="button"
              className="ms-btn-back"
              onClick={() => navigate(`/barberia/${barberia.id}`)}
            >
              <IconChevronLeft size={18} />
              Regresar
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

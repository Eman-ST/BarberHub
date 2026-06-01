import { useLocation, useNavigate } from "react-router-dom";
import { formatearHorarioCorto, keyAFecha } from "../utils/fecha";
import { BARBERIA_DEMO } from "../data/barberia-demo";
import "../styles/mis-citas.css";

export default function MisCitas() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const cita = state?.cita ?? {
    establecimiento: BARBERIA_DEMO.nombre,
    servicio: BARBERIA_DEMO.servicio,
    precio: BARBERIA_DEMO.precioEstimado,
    moneda: BARBERIA_DEMO.moneda,
    fecha: "2026-05-21",
    hora: "11:30",
  };

  const horario = formatearHorarioCorto(keyAFecha(cita.fecha), cita.hora);

  return (
    <div className="mc-page">
      <div className="mc-card">
        <h1 className="mc-title">Mis citas</h1>
        <p className="mc-subtitle">Próximamente verás aquí todas tus reservas.</p>

        <article className="mc-cita-item">
          <div className="mc-cita-top">
            <span>{horario}</span>
            <span className="mc-cita-price">
              ${cita.precio} {cita.moneda}
            </span>
          </div>
          <p className="mc-cita-servicio">{cita.servicio}</p>
          <p className="mc-cita-lugar">Barbería {cita.establecimiento}</p>
        </article>

        <button
          type="button"
          className="mc-btn-home"
          onClick={() => navigate("/")}
        >
          Ir al Inicio
        </button>
      </div>
    </div>
  );
}

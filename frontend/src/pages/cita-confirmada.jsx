import { useLocation, useNavigate } from "react-router-dom";
import { IconCircleCheck } from "@tabler/icons-react";
import { BARBERIA_DEMO } from "../data/barberia-demo";
import { formatearHorarioCorto, keyAFecha } from "../utils/fecha";
import "../styles/cita-confirmada.css";

const CITA_DEMO = {
  establecimiento: BARBERIA_DEMO.nombre,
  servicio: BARBERIA_DEMO.servicio,
  precio: BARBERIA_DEMO.precioEstimado,
  moneda: BARBERIA_DEMO.moneda,
  fecha: "2026-05-21",
  hora: "11:30",
};

export default function CitaConfirmada() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const cita = {
    establecimiento: state?.establecimiento ?? CITA_DEMO.establecimiento,
    servicio: state?.servicio ?? CITA_DEMO.servicio,
    precio: state?.precio ?? CITA_DEMO.precio,
    moneda: state?.moneda ?? CITA_DEMO.moneda,
    fecha: state?.fecha ?? CITA_DEMO.fecha,
    hora: state?.hora ?? CITA_DEMO.hora,
    nombre: state?.nombre ?? "",
    telefono: state?.telefono ?? "",
  };

  const fechaObj = keyAFecha(cita.fecha);
  const horarioCorto = formatearHorarioCorto(fechaObj, cita.hora);
  const diaSemana = horarioCorto.split(" a las ")[0];

  return (
    <div className="cc-page">
      <div className="cc-card">
        <div className="cc-icon-wrap" aria-hidden>
          <IconCircleCheck size={36} stroke={2} color="#fff" />
        </div>

        <h1 className="cc-title">Cita confirmada</h1>

        <p className="cc-message">
          Tu cita ha sido confirmada. Llega antes del{" "}
          <strong>{horarioCorto}</strong>. El servicio estará esperándote en{" "}
          <strong>{cita.establecimiento}</strong>.
        </p>

        <div className="cc-summary">
          <div className="cc-summary-header">
            <span className="cc-summary-time">{horarioCorto}</span>
            <span className="cc-summary-price">
              ${cita.precio} {cita.moneda}
            </span>
          </div>

          <div className="cc-summary-body">
            <img
              className="cc-summary-logo"
              src="/barberhublogo.jpg"
              alt=""
            />
            <div>
              <div className="cc-service-name">{cita.servicio}</div>
              <div className="cc-shop-name">
                Barbería {cita.establecimiento}
              </div>
            </div>
          </div>
        </div>

        <div className="cc-actions">
          <button
            type="button"
            className="cc-btn-outline"
            onClick={() => navigate("/mis-citas", { state: { cita } })}
          >
            Ver mis citas
          </button>
          <button
            type="button"
            className="cc-btn-primary"
            onClick={() => navigate("/")}
          >
            Ir al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}

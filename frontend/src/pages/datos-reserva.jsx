import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconCircleCheck } from "@tabler/icons-react";
import { BARBERIA_DEMO } from "../data/barberia-demo";
import { apiFetch } from "../utils/api";
import {
  formatearHorarioCita,
  keyAFecha,
} from "../utils/fecha";
import "../styles/datos-reserva.css";

const RESERVA_DEMO = {
  establecimiento: BARBERIA_DEMO.nombre,
  servicio: BARBERIA_DEMO.servicio,
  precio: BARBERIA_DEMO.precioEstimado,
  moneda: BARBERIA_DEMO.moneda,
  fecha: "2026-05-21",
  hora: "09:00",
};

export default function DatosReserva() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const reserva = {
    barberiaId: state?.barberiaId ?? "urban-cuts",
    establecimiento: state?.establecimiento ?? RESERVA_DEMO.establecimiento,
    servicio: state?.servicio ?? RESERVA_DEMO.servicio,
    precio: state?.precio ?? RESERVA_DEMO.precio,
    moneda: state?.moneda ?? RESERVA_DEMO.moneda,
    fecha: state?.fecha ?? RESERVA_DEMO.fecha,
    hora: state?.hora ?? RESERVA_DEMO.hora,
  };

  const fechaObj = keyAFecha(reserva.fecha);
  const horarioTexto = formatearHorarioCita(fechaObj, reserva.hora);

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const confirmar = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim()) {
      setError("Completa tu nombre y teléfono para confirmar la cita.");
      return;
    }

    setEnviando(true);
    setError("");

    try {
      await apiFetch("/citas", {
        method: "POST",
        body: JSON.stringify({
          barberiaId: reserva.barberiaId,
          establecimiento: reserva.establecimiento,
          servicio: reserva.servicio,
          precio: reserva.precio,
          moneda: reserva.moneda,
          fecha: reserva.fecha,
          hora: reserva.hora,
          nombre: nombre.trim(),
          telefono: telefono.trim(),
        }),
      });

      navigate("/cita-confirmada", {
        state: {
          ...reserva,
          nombre: nombre.trim(),
          telefono: telefono.trim(),
        },
      });
    } catch (err) {
      setError(err.message);
      setEnviando(false);
    }
  };

  return (
    <div className="dr-page">
      {/* Se removió PageNavbar para evitar la duplicidad de la barra superior */}
      <div className="dr-body">
        <div className="dr-card">
          <div className="dr-icon-wrap" aria-hidden="true">
            <IconCircleCheck size={48} stroke={2} color="#fff" />
          </div>

          <h1 className="dr-title">Datos de Reserva</h1>
          <p className="dr-subtitle">
            No necesitas cuenta. Completa los datos para agendar en el local.
          </p>

          <form className="dr-form" onSubmit={confirmar}>
            <input
              className="dr-input"
              type="text"
              placeholder="Tu Nombre Completo"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                setError("");
              }}
              required
            />
            <input
              className="dr-input"
              type="tel"
              placeholder="Teléfono / WhatsApp"
              value={telefono}
              onChange={(e) => {
                setTelefono(e.target.value);
                setError("");
              }}
              required
            />

            <div className="dr-summary">
              <div className="dr-summary-row">
                <span className="dr-label">ESTABLECIMIENTO</span>
                <span className="dr-value">{reserva.establecimiento}</span>
              </div>
              <div className="dr-summary-row">
                <span className="dr-label">HORARIO</span>
                <span className="dr-value">{horarioTexto}</span>
              </div>
              <div className="dr-summary-row">
                <span className="dr-label">SERVICIO</span>
                <span className="dr-value">{reserva.servicio}</span>
              </div>
              <div className="dr-summary-row highlight">
                <span className="dr-label">TOTAL ESTIMADO</span>
                <span className="dr-value price">
                  ${reserva.precio} {reserva.moneda}
                </span>
              </div>
            </div>

            {error && <p className="dr-error">{error}</p>}

            <div className="dr-actions">
              <button
                type="button"
                className="dr-btn-cancel"
                onClick={() => navigate("/agenda-local")}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="dr-btn-confirm"
                disabled={enviando}
              >
                {enviando ? "Confirmando..." : "Confirmar Cita"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
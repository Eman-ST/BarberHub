import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppNavbar from "../components/app-navbar";
import {
  getBarberiaById,
  generarSlots,
  obtenerEstadoSlot,
} from "../data/barberias";
import {
  construirCeldasCalendario,
  fechaAKey,
  nombreMesAnio,
  DIAS_CORTOS,
} from "../utils/fecha";
import "../styles/agenda-local.css";

const FECHA_INICIAL = new Date(2026, 4, 21);

export default function AgendaLocal() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const barberia = getBarberiaById(state?.barberiaId ?? "urban-cuts");
  const [mesVisible, setMesVisible] = useState(
    () => new Date(FECHA_INICIAL.getFullYear(), FECHA_INICIAL.getMonth(), 1),
  );
  const [fechaSeleccionada, setFechaSeleccionada] = useState(FECHA_INICIAL);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [error, setError] = useState("");

  const fechaKey = fechaAKey(fechaSeleccionada);
  const slots = useMemo(() => generarSlots(barberia), [barberia]);

  const celdas = useMemo(
    () =>
      construirCeldasCalendario(
        mesVisible.getFullYear(),
        mesVisible.getMonth(),
      ),
    [mesVisible],
  );

  const cambiarMes = (delta) => {
    setMesVisible(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1),
    );
    setHoraSeleccionada(null);
    setError("");
  };

  const seleccionarDia = (fecha) => {
    setFechaSeleccionada(fecha);
    setHoraSeleccionada(null);
    setError("");
  };

  const seleccionarHora = (hora, estado) => {
    if (estado === "ocupado") return;
    setHoraSeleccionada(hora);
    setError("");
  };

  const continuar = () => {
    if (!horaSeleccionada) {
      setError("Selecciona un horario disponible para continuar.");
      return;
    }

    navigate("/datos-reserva", {
      state: {
        barberiaId: barberia.id,
        establecimiento: barberia.nombre,
        servicio: barberia.servicioDefault,
        precio: barberia.precioEstimado,
        moneda: barberia.moneda,
        fecha: fechaKey,
        hora: horaSeleccionada,
      },
    });
  };

  const mismaFecha = (a, b) => fechaAKey(a) === fechaAKey(b);

  return (
    <div className="ag-page">
      <AppNavbar />

      <main className="ag-main">
        <div className="ag-layout">
          {/* Calendario */}
          <section className="ag-calendar-section" aria-label="Calendario">
            <div className="ag-month-header">
              <button
                type="button"
                className="ag-month-nav"
                onClick={() => cambiarMes(-1)}
                aria-label="Mes anterior"
              >
                ‹
              </button>
              <h2 className="ag-month-title">{nombreMesAnio(mesVisible)}</h2>
              <button
                type="button"
                className="ag-month-nav"
                onClick={() => cambiarMes(1)}
                aria-label="Mes siguiente"
              >
                ›
              </button>
            </div>

            <div className="ag-weekdays">
              {DIAS_CORTOS.map((dia) => (
                <div key={dia} className="ag-weekday">
                  {dia}
                </div>
              ))}
            </div>

            <div className="ag-days-grid">
              {celdas.map(({ fecha, fueraDeMes }) => {
                const seleccionado = mismaFecha(fecha, fechaSeleccionada);
                return (
                  <button
                    key={fechaAKey(fecha)}
                    type="button"
                    className={[
                      "ag-day",
                      fueraDeMes && "ag-day--outside",
                      seleccionado && "ag-day--selected",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => seleccionarDia(fecha)}
                  >
                    {fecha.getDate()}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Horarios */}
          <section className="ag-slots-section" aria-label="Horarios disponibles">
            <h3 className="ag-slots-title">HORARIOS DISPONIBLES</h3>

            <div className="ag-slots-grid">
              {slots.map((hora) => {
                const estado = obtenerEstadoSlot(
                  barberia,
                  fechaKey,
                  hora,
                  horaSeleccionada,
                );
                return (
                  <button
                    key={hora}
                    type="button"
                    className={`ag-slot ag-slot--${estado}`}
                    disabled={estado === "ocupado"}
                    onClick={() => seleccionarHora(hora, estado)}
                  >
                    {hora}
                  </button>
                );
              })}
            </div>

            <div className="ag-legend">
              <span className="ag-legend-item">
                <i className="ag-legend-dot ag-legend-dot--selected" />
                Seleccionado
              </span>
              <span className="ag-legend-item">
                <i className="ag-legend-dot ag-legend-dot--available" />
                Disponible
              </span>
              <span className="ag-legend-item">
                <i className="ag-legend-dot ag-legend-dot--occupied" />
                Ocupado
              </span>
            </div>

            {error && <p className="ag-error">{error}</p>}

            <button
              type="button"
              className="ag-btn-continuar"
              onClick={continuar}
            >
              Continuar
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

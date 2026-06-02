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

// Obtenemos la fecha actual y la limpiamos a las 00:00:00 para comparar correctamente
const HOY = new Date();
HOY.setHours(0, 0, 0, 0);

export default function AgendaLocal() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const barberia = getBarberiaById(state?.barberiaId ?? "urban-cuts");
  
  // Fijamos el mes visible al mes actual, ya no necesitamos setMesVisible
  const mesVisible = useMemo(() => new Date(HOY.getFullYear(), HOY.getMonth(), 1), []);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(HOY);
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

  // ── PALETAS DE ESTILO DINÁMICAS ──────────────────────────────────────────
  const obtenerEstiloDia = (fecha, fueraDeMes, seleccionado, esPasado) => {
    let baseStyle = {
      width: '100%',
      aspectRatio: '1',
      backgroundColor: '#fff',
      border: '1px solid #f3f4f6',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#171717',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s'
    };

    if (fueraDeMes || esPasado) {
      baseStyle.color = '#d1d5db';
      baseStyle.backgroundColor = '#f9fafb';
      baseStyle.cursor = 'not-allowed';
      baseStyle.border = '1px solid #f3f4f6';
    } else if (seleccionado) {
      baseStyle.backgroundColor = '#b8836f';
      baseStyle.color = '#fff';
      baseStyle.border = '1px solid #b8836f';
      baseStyle.boxShadow = '0 4px 10px rgba(184, 131, 111, 0.3)';
    } else {
      // Hover ligero para días disponibles (se aplica mejor con CSS puro, pero el default funciona)
      baseStyle.border = '1px solid #e5e7eb';
    }
    
    return baseStyle;
  };

  const obtenerEstiloSlot = (estado) => {
    let baseStyle = {
      backgroundColor: '#f9f5f0',
      color: '#171717',
      fontWeight: 'bold',
      fontSize: '13px',
      padding: '14px 4px',
      borderRadius: '12px',
      border: '1px solid #e6c7a8',
      cursor: 'pointer',
      transition: 'all 0.2s',
      width: '100%'
    };

    if (estado === 'seleccionado') {
      baseStyle.backgroundColor = '#000';
      baseStyle.color = '#e8c46a';
      baseStyle.border = '1px solid #000';
      baseStyle.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else if (estado === 'ocupado') {
      baseStyle.backgroundColor = '#f3f4f6';
      baseStyle.color = '#9ca3af';
      baseStyle.border = '1px solid #e5e7eb';
      baseStyle.cursor = 'not-allowed';
      baseStyle.textDecoration = 'line-through';
    }
    return baseStyle;
  };

  return (
    <div className="ag-page" style={{ backgroundColor: '#fcf8f3', minHeight: '100vh', paddingBottom: '40px', fontFamily: 'sans-serif' }}>
      <AppNavbar />

      <main className="ag-main" style={{ maxWidth: '1280px', margin: '24px auto 0 auto', padding: '0 16px' }}>
        <div className="ag-layout" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
          
          {/* SECCIÓN 1: CALENDARIO */}
          <section className="ag-calendar-section" aria-label="Calendario" style={{ flex: '1 1 45%', minWidth: '320px', backgroundColor: '#fff', border: '1px solid #e6c7a8', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <div className="ag-month-header" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px' }}>
              <h2 className="ag-month-title" style={{ fontSize: '20px', fontWeight: '900', color: '#171717', margin: 0, fontFamily: 'serif', textTransform: 'capitalize' }}>
                {nombreMesAnio(mesVisible)}
              </h2>
            </div>

            <div className="ag-weekdays" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '12px', fontWeight: 'bold', fontSize: '12px', color: '#b8836f' }}>
              {DIAS_CORTOS.map((dia) => (
                <div key={dia} className="ag-weekday">
                  {dia}
                </div>
              ))}
            </div>

            <div className="ag-days-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
              {celdas.map(({ fecha, fueraDeMes }) => {
                const seleccionado = mismaFecha(fecha, fechaSeleccionada);
                // Bloqueamos días pasados además de los que están fuera del mes
                const esPasado = fecha < HOY;
                const deshabilitado = fueraDeMes || esPasado;

                return (
                  <button
                    key={fechaAKey(fecha)}
                    type="button"
                    disabled={deshabilitado}
                    className={[
                      "ag-day",
                      fueraDeMes && "ag-day--outside",
                      seleccionado && "ag-day--selected",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => {
                      if (!deshabilitado) seleccionarDia(fecha);
                    }}
                    style={obtenerEstiloDia(fecha, fueraDeMes, seleccionado, esPasado)}
                  >
                    {fecha.getDate()}
                  </button>
                );
              })}
            </div>
          </section>

          {/* SECCIÓN 2: HORARIOS */}
          <section className="ag-slots-section" aria-label="Horarios disponibles" style={{ flex: '1 1 45%', minWidth: '320px', backgroundColor: '#fff', border: '1px solid #e6c7a8', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
            <h3 className="ag-slots-title" style={{ fontSize: '13px', fontWeight: '900', color: '#171717', letterSpacing: '0.05em', marginBottom: '20px', fontFamily: 'serif', textTransform: 'uppercase', borderBottom: '2px solid #f9f5f0', paddingBottom: '10px' }}>
              HORARIOS DISPONIBLES
            </h3>

            <div className="ag-slots-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
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
                    style={obtenerEstiloSlot(estado)}
                  >
                    {hora}
                  </button>
                );
              })}
            </div>

            {/* Referencias/Leyenda de estados */}
            <div className="ag-legend" style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px', padding: '12px', backgroundColor: '#f9f5f0', borderRadius: '12px', border: '1px solid #e6c7a8' }}>
              <span className="ag-legend-item" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold', color: '#4b5563' }}>
                <i className="ag-legend-dot ag-legend-dot--selected" style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#000' }} />
                Seleccionado
              </span>
              <span className="ag-legend-item" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold', color: '#4b5563' }}>
                <i className="ag-legend-dot ag-legend-dot--available" style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#e6c7a8' }} />
                Disponible
              </span>
              <span className="ag-legend-item" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold', color: '#4b5563' }}>
                <i className="ag-legend-dot ag-legend-dot--occupied" style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#e5e7eb' }} />
                Ocupado
              </span>
            </div>

            {error && (
              <p className="ag-error" style={{ color: '#dc2626', fontSize: '13px', fontWeight: 'bold', backgroundColor: '#fef2f2', border: '1px solid #fca5a5', padding: '10px 14px', borderRadius: '10px', marginBottom: '16px', textAlign: 'center', margin: '0 0 16px 0' }}>
                {error}
              </p>
            )}

            <button
              type="button"
              className="ag-btn-continuar"
              onClick={continuar}
              style={{ width: '100%', backgroundColor: '#000', color: '#e8c46a', padding: '14px 0', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              Continuar
            </button>
          </section>

        </div>
      </main>
    </div>
  );
}
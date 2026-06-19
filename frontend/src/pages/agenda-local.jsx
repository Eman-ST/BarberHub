import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/agenda-local.css";

export default function AgendaLocal() {
  const navigate = useNavigate();

  // Estado para el día seleccionado (Mayo 2026)
  const [diaSeleccionado, setDiaSeleccionado] = useState(21);
  // Estado para la hora seleccionada (Inicia en "9:00" que es disponible)
  const [horaSeleccionada, setHoraSeleccionada] = useState("9:00");

  // Simulación de los días de Mayo 2026 (Empezando en Viernes 1)
  const diasMayo = [
    "", "", "", "", 1, 2, 3,
    4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31
  ];

  // Listado de horarios base con sus estados reales de ocupación
  const horariosBase = [
    { hora: "9:00", ocupado: false },
    { hora: "9:30", ocupado: true },
    { hora: "10:00", ocupado: true },
    { hora: "10:30", ocupado: true },
    { hora: "11:00", ocupado: false },
    { hora: "11:30", ocupado: false },
    { hora: "12:00", ocupado: true },
    { hora: "12:30", ocupado: false },
    { hora: "13:00", ocupado: false },
    { hora: "13:30", ocupado: false },
    { hora: "14:00", ocupado: false },
    { hora: "14:30", ocupado: true },
    { hora: "15:00", ocupado: false },
    { hora: "15:30", ocupado: true },
    { hora: "16:00", ocupado: true },
  ];

  const handleContinuar = () => {
    if (!diaSeleccionado || !horaSeleccionada) return;
    
    navigate("/datos-reserva", {
      state: {
        fecha: `2026-05-${diaSeleccionado.toString().padStart(2, "0")}`,
        hora: horaSeleccionada,
        barberiaId: "urban-cuts",
        establecimiento: "URBAN CUTS"
      }
    });
  };

  return (
    <div className="ag-page" style={{ paddingBottom: '40px', fontFamily: 'sans-serif' }}>
      <main className="ag-main" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <h1 style={{ fontFamily: 'serif', fontSize: '36px', fontWeight: 'bold', color: '#e8c46a', textAlign: 'center', marginBottom: '40px' }}>
          Agenda tu próximo corte
        </h1>
        
        {/* Contenedor Flexbox alineado correctamente ocupando el ancho total disponible */}
        <div className="ag-layout" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'flex-start', justifyContent: 'center' }}>
          
          {/* Columna Izquierda: Calendario */}
          <div className="al-calendar-grid">
            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((d) => (
              <div key={d} className="al-weekday-header">{d}</div>
            ))}

            {diasMayo.map((dia, index) => {
              if (dia === "") return <div key={`empty-${index}`} className="al-day-cell empty"></div>;
              
              const esSeleccionado = diaSeleccionado === dia;
              return (
                <div
                  key={`dia-${dia}`}
                  className={`al-day-cell ${esSeleccionado ? "active" : ""}`}
                  onClick={() => setDiaSeleccionado(dia)}
                >
                  {dia}
                </div>
              );
            })}
          </div>

          {/* Columna Derecha: Horarios Disponibles */}
          <section className="al-hours-section">
            <h3 className="al-hours-title">HORARIOS DISPONIBLES</h3>

            <div className="al-hours-grid">
              {horariosBase.map((item) => {
                const esElSeleccionadoActual = horaSeleccionada === item.hora;
                
                let claseEstado = "disponible"; 
                if (item.ocupado) {
                  claseEstado = "ocupado"; 
                } else if (esElSeleccionadoActual) {
                  claseEstado = "seleccionado"; 
                }

                return (
                  <button
                    key={item.hora}
                    className={`al-hour-btn ${claseEstado}`}
                    disabled={item.ocupado}
                    onClick={() => setHoraSeleccionada(item.hora)}
                  >
                    {item.hora}
                  </button>
                );
              })}
            </div>

            {/* Código de Colores / Leyenda */}
            <div className="al-legend-box">
              <div className="al-legend-item">
                <span className="al-dot legend-seleccionado"></span>
                <span>Seleccionado</span>
              </div>
              <div className="al-legend-item">
                <span className="al-dot legend-disponible"></span>
                <span>Disponible</span>
              </div>
              <div className="al-legend-item">
                <span className="al-dot legend-ocupado"></span>
                <span>Ocupado</span>
              </div>
            </div>

            <button className="al-btn-submit" onClick={handleContinuar}>
              Continuar
            </button>
          </section>

        </div>
      </main>
    </div>
  );
}
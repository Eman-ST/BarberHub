import React from 'react';
import { FiScissors, FiClock, FiCheck } from 'react-icons/fi';
import '../styles/MisCitas.css'; 

export default function MisCitas() {
  // Arreglo de datos dinámicos simulando tu base de datos de Node
  const citas = [
    {
      id: 1,
      tipo: "Corte Clásico",
      barbero: "Carlos Reyes",
      barberia: "Black Edge Barber",
      fecha: "Mañana 11:00 a.m.",
      precio: 80,
      badgeTexto: "Esperando respuesta - 10 min",
      badgeTipo: "espera",
      pasos: [
        { nombre: "Enviada", estado: "completado" },
        { nombre: "Revisada", estado: "actual" },
        { nombre: "Confirmada", estado: "pendiente" },
        { nombre: "Completada", estado: "pendiente" }
      ]
    },
    {
      id: 2,
      tipo: "Corte + Barba",
      barbero: "Miguel González",
      barberia: "La Navaja Clásica",
      fecha: "Jueves 29 de mayo a las 3:00 p.m.",
      precio: 120,
      badgeTexto: "Confirmada - en 3 días",
      badgeTipo: "confirmada",
      pasos: [
        { nombre: "Enviada", estado: "completado" },
        { nombre: "Aceptada", estado: "completado" },
        { nombre: "Confirmada", estado: "actual" },
        { nombre: "Completada", estado: "pendiente" }
      ]
    }
  ];

  return (
    <div className="bh-main">
      <h1 className="bh-title">Mis Citas</h1>
      <h2 className="bh-subtitle">Pendiente de confirmación</h2>

      <div className="bh-cards-grid">
        {citas.map((cita) => (
          <div key={cita.id} className="bh-card">
            
            {/* Lado Izquierdo de la Tarjeta */}
            <div className="bh-card-left">
              <div className="bh-service-header">
                <div className="bh-icon-circle">
                  {cita.tipo.includes("Barba") ? (
                    <span style={{ fontSize: '20px' }}>🪒</span>
                  ) : (
                    <FiScissors style={{ transform: 'rotate(-45deg)' }} />
                  )}
                </div>
                <div>
                  <h3 className="bh-service-title">{cita.tipo} - {cita.barbero}</h3>
                  <p className="bh-service-meta">{cita.barberia} - {cita.fecha}</p>
                </div>
              </div>

              <div>
                <span className={`bh-badge ${cita.badgeTipo}`}>
                  {cita.badgeTipo === "espera" ? <FiClock /> : <FiCheck />}
                  {cita.badgeTexto}
                </span>
              </div>

              {/* --- STEPPER (PROGRESO) --- */}
              <div className="bh-stepper">
                {cita.pasos.map((paso, index) => (
                  <React.Fragment key={index}>
                    <div className="bh-step-node">
                      <div className={`bh-step-dot ${paso.estado}`} />
                      <span className={`bh-step-label ${paso.estado}`}>{paso.nombre}</span>
                    </div>
                    
                    {index < cita.pasos.length - 1 && (
                      <div className={`bh-step-line ${
                        cita.pasos[index + 1].estado === "completado" || paso.estado === "actual" ? 'active' : ''
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Lado Derecho de la Tarjeta */}
            <div className="bh-card-right">
              <span className="bh-price">${cita.precio}</span>
              <div className="bh-actions-group">
                <button className="bh-btn">Ver detalles</button>
                <button className="bh-btn">Cancelar</button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
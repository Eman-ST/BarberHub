import React, { useState } from "react";
import "../styles/mis-citas.css";

// Mock de datos extraído directamente de la vista del navegador
const citasData = [
  {
    id: 1,
    servicio: "Corte Clásico",
    barbero: "Carlos Reyes",
    barberia: "Peluquería Black Edge",
    horario: "Mañana 11:00 am",
    precio: "$80",
    badgeTexto: "Esperando respuesta - 10 min",
    badgeTipo: "esperando",
    pasoActual: 1,
    pasos: [
      { id: 1, label: "Enviada", estado: "completado" },
      { id: 2, label: "Revisada", estado: "actual" },
      { id: 3, label: "Confirmada", estado: "pendiente" },
      { id: 4, label: "Completada", estado: "pendiente" }
    ]
  },
  {
    id: 2,
    servicio: "Corte + Barba",
    barbero: "Miguel González",
    barberia: "La Navaja Clásica",
    horario: "Jueves 29 de mayo a las 3:00 pm",
    precio: "$120",
    badgeTexto: "Confirmada - en 3 días",
    badgeTipo: "confirmada",
    pasoActual: 3,
    pasos: [
      { id: 1, label: "Enviada", estado: "completado" },
      { id: 2, label: "Aceptada", estado: "completado" },
      { id: 3, label: "Confirmada", estado: "actual" },
      { id: 4, label: "Completada", estado: "pendiente" }
    ]
  }
];

export default function MisCitas() {
  const [menuActivo, setMenuActivo] = useState("Mis citas");

  const handleCardClick = (id) => {
    console.log(`Clic en tarjeta de cita #${id}: Abrir vista rápida.`);
  };

  const handleVerDetalles = (id, e) => {
    e.stopPropagation();
    console.log(`Abriendo detalles completos de la cita #${id}. listo para backend.`);
  };

  const handleCancelarCita = (id, e) => {
    e.stopPropagation();
    console.log(`Iniciando flujo de cancelación para la cita #${id}.`);
  };

  const handleStepClick = (citaId, pasoLabel, e) => {
    e.stopPropagation();
    console.log(`Clic en el estado "${pasoLabel}" de la cita #${citaId}.`);
  };

  return (
    <div className="mc-dashboard">
      {/* Sidebar Izquierdo Oscuro */}
      <aside className="mc-sidebar-left">
        <div className="mc-brand">
          <img src="/barberhublogo.jpg" alt="Barber Hub" className="mc-logo-img" />
          <h2>BARBER HUB</h2>
        </div>

        <nav className="mc-nav-menu">
          {["Explorar", "Mis citas", "Historial", "Favoritos", "Notificaciones", "Ajustes"].map((item) => (
            <button
              key={item}
              className={`mc-nav-btn ${menuActivo === item ? "activo" : ""}`}
              onClick={() => setMenuActivo(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="mc-user-profile">
          <div className="mc-avatar-placeholder">LM</div>
          <div className="mc-user-info">
            <span className="mc-user-name">Luis Méndez</span>
          </div>
        </div>
      </aside>

      {/* Contenedor Principal */}
      <div className="mc-main-wrapper">
        <header className="mc-main-header">
          <h1>Mis Citas</h1>
        </header>

        <main className="mc-content-layout">
          <div className="mc-citas-container">
            
            <h2 className="mc-section-title">Pendiente de confirmation</h2>

            <div className="mc-citas-list">
              {citasData.map((cita) => (
                <div 
                  key={cita.id} 
                  className="mc-cita-card"
                  onClick={() => handleCardClick(cita.id)}
                  role="button"
                  tabIndex={0}
                >
                  {/* Bloque Izquierdo: Información y Progreso */}
                  <div className="mc-card-left-block">
                    
                    <div className="mc-header-info">
                      <div className="mc-service-icon">
                        {cita.id === 1 ? "✂️" : "🪮"}
                      </div>
                      <div className="mc-text-details">
                        <h3>{cita.servicio} - {cita.barbero}</h3>
                        <p>{cita.barberia} - {cita.horario}</p>
                      </div>
                    </div>

                    {/* Badge de Estado Dinámico */}
                    <div className={`mc-status-badge ${cita.badgeTipo}`}>
                      <span className="mc-badge-icon">
                        {cita.badgeTipo === "confirmada" ? "✓" : "🕒"}
                      </span>
                      {cita.badgeTexto}
                    </div>

                    {/* Stepper de Progreso Interactivo */}
                    <div className="mc-stepper-flow">
                      {cita.pasos.map((paso, idx) => (
                        <React.Fragment key={paso.id}>
                          <button 
                            className={`mc-step-node ${paso.estado}`}
                            onClick={(e) => handleStepClick(cita.id, paso.label, e)}
                            title={`Estado: ${paso.label}`}
                          >
                            <span className="mc-step-dot"></span>
                            <span className="mc-step-label">{paso.label}</span>
                          </button>
                          {idx < cita.pasos.length - 1 && (
                            <div className={`mc-step-line ${cita.pasos[idx + 1].estado === "completado" || cita.pasos[idx + 1].estado === "actual" ? "activa" : ""}`}></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                  </div>

                  {/* Bloque Derecho: Precio y Acciones */}
                  <div className="mc-card-right-block">
                    <span className="mc-price-tag">{cita.precio}</span>
                    <div className="mc-action-buttons">
                      <button className="mc-btn-action mc-btn-details" onClick={(e) => handleVerDetalles(cita.id, e)}>
                        Ver detalles
                      </button>
                      <button className="mc-btn-action mc-btn-cancel" onClick={(e) => handleCancelarCita(cita.id, e)}>
                        Cancelar
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import "../styles/notificaciones.css";

const notificacionesData = [
  {
    id: 1,
    titulo: "Cita Confirmada",
    descripcion: "Carlos Reyes confirmó tu cita del día martes 27 de junio a las 11:00 a.m.",
    tiempo: "Hace 12 min",
    leido: false
  },
  {
    id: 2,
    titulo: "Recordatorio - Mañana 11:00 a.m",
    descripcion: "Tu cita con Carlos Reyes en Black Edge es mañana a las 11:00 a.m.",
    tiempo: "Hace 1 hr",
    leido: false
  },
  {
    id: 3,
    titulo: "Califica Tu Visita",
    descripcion: "¿Cómo fue tu experiencia con Miguel Gutierrez?",
    tiempo: "Ayer 4 p.m",
    leido: true
  },
  {
    id: 4,
    titulo: "Cita Rechazada",
    descripcion: "El barbero Juan Santos no pudo aceptar tu cita del día lunes a las 5:00 p.m.",
    tiempo: "Ayer 10 a.m",
    leido: true
  },
  {
    id: 5,
    titulo: "Nuevo Cupón Disponible",
    descripcion: "Tienes un cupón de bienvenida del 10%.",
    tiempo: "Hace 12 min",
    leido: false
  }
];

export default function Notificaciones() {
  const [menuActivo, setMenuActivo] = useState("Notificaciones");

  const handleNotificationClick = (id) => {
    console.log(`Notificación ${id} clickeada. Listo para conectar al backend.`);
  };

  const sinLeerContador = notificacionesData.filter(n => !n.leido).length;

  return (
    <div className="nt-dashboard">
      <aside className="nt-sidebar-left">
        <div className="nt-brand">
          <img src="/barberhublogo.jpg" alt="Barber Hub" className="nt-logo-img" />
          <h2>BARBER HUB</h2>
        </div>

        <nav className="nt-nav-menu">
          {["Explorar", "Mis citas", "Historial", "Favoritos", "Notificaciones", "Ajustes"].map((item) => (
            <button
              key={item}
              className={`nt-nav-btn ${menuActivo === item ? "activo" : ""}`}
              onClick={() => setMenuActivo(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="nt-user-profile">
          <div className="nt-avatar-placeholder">LM</div>
          <div className="nt-user-info">
            <span className="nt-user-name">Luis Méndez</span>
            <span className="nt-user-role">Básico</span>
          </div>
        </div>
      </aside>

      <div className="nt-main-wrapper">
        <header className="nt-main-header">
          <h1>Notificaciones</h1>
        </header>

        <main className="nt-content-layout">
          <div className="nt-cards-container">
            
            <div className="nt-unread-counter">
              <span className="nt-counter-dot"></span>
              <p>{sinLeerContador} sin leer</p>
            </div>

            <div className="nt-notifications-list">
              {notificacionesData.map((alerta) => (
                <button 
                  key={alerta.id} 
                  className={`nt-card-item-btn ${!alerta.leido ? "nt-no-leida" : ""}`}
                  onClick={() => handleNotificationClick(alerta.id)}
                  title="Marcar como leída / Ver detalles"
                >
                  <div className="nt-icon-placeholder"></div>

                  <div className="nt-item-info">
                    <h3>{alerta.titulo}</h3>
                    <p className="nt-item-description">{alerta.descripcion}</p>
                  </div>

                  <div className="nt-item-meta">
                    <span className="nt-time-text">{alerta.tiempo}</span>
                    {!alerta.leido && <span className="nt-unread-dot"></span>}
                  </div>
                </button>
              ))}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
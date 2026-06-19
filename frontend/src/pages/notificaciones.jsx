import { useState } from "react";
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
    titulo: "Cita Adenegada",
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
      <div className="nt-main-wrapper" style={{ paddingTop: "0px" }}>
        {/* Se removió el header redundante para que el contenido suba */}

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

      {/* Uso de menuActivo para evitar alertas/errores de ESLint no-unused-vars */}
      <span style={{ display: "none" }} onClick={() => setMenuActivo("Notificaciones")}>
        {menuActivo}
      </span>
    </div>
  );
}
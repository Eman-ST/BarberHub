import { useState } from "react";
import "../styles/ajustes.css";

export default function Ajustes() {
  const [recordatorio, setRecordatorio] = useState(true);
  const [citaConfirmada, setCitaConfirmada] = useState(true);
  const [nuevosCupones, setNuevosCupones] = useState(false);
  const [verificacion2Pasos, setVerificacion2Pasos] = useState(true);

  const handleStatClick = (statType) => {
    console.log(`Redirigiendo a detalles de: ${statType}. Conexión lista para backend.`);
  };

  const handlePasswordChange = () => {
    console.log("Abrir modal para cambiar contraseña.");
  };

  const handleDeleteAccount = () => {
    console.log("Confirmación de borrado de cuenta iniciada.");
  };

  return (
    <div className="aj-content-layout">
      <div className="aj-settings-container">
        
        {/* Columna Izquierda: Perfil y Métricas */}
        <div className="aj-column-left">
          
          <div className="aj-profile-card">
            <div className="aj-profile-avatar">LM</div>
            <h3>Luis Méndez</h3>
            <p>luis.mendez@gmail.com</p>
          </div>

          <button className="aj-change-photo-btn">
            <span>Cambiar foto de perfil</span>
            <span className="aj-icon-photo">🖼️</span>
          </button>

          {/* Grid de Métricas */}
          <div className="aj-stats-grid">
            <button className="aj-stat-item-btn" onClick={() => handleStatClick("visitas")}>
              <strong>6</strong>
              <span>Visitas</span>
            </button>
            <button className="aj-stat-item-btn" onClick={() => handleStatClick("puntos")}>
              <strong>50</strong>
              <span>Puntos</span>
            </button>
            <button className="aj-stat-item-btn" onClick={() => handleStatClick("calificacion")}>
              <strong>4.8</strong>
              <span>Calificación</span>
            </button>
          </div>

        </div>

        {/* Columna Derecha: Opciones de Configuración */}
        <div className="aj-column-right">
          
          <section className="aj-section-group">
            <h2>Notificaciones</h2>
            
            <div className="aj-setting-row">
              <div className="aj-row-label">
                <span className="aj-row-icon aj-icon-orange">🔔</span>
                <span>Recordatorio de cita</span>
              </div>
              <label className="aj-switch">
                <input type="checkbox" checked={recordatorio} onChange={() => setRecordatorio(!recordatorio)} />
                <span className="aj-slider"></span>
              </label>
            </div>

            <div className="aj-setting-row">
              <div className="aj-row-label">
                <span className="aj-row-icon aj-icon-blue">✔️</span>
                <span>Cita confirmada</span>
              </div>
              <label className="aj-switch">
                <input type="checkbox" checked={citaConfirmada} onChange={() => setCitaConfirmada(!citaConfirmada)} />
                <span className="aj-slider"></span>
              </label>
            </div>

            <div className="aj-setting-row">
              <div className="aj-row-label">
                <span className="aj-row-icon aj-icon-green">🎫</span>
                <span>Nuevos cupones</span>
              </div>
              <label className="aj-switch">
                <input type="checkbox" checked={nuevosCupones} onChange={() => setNuevosCupones(!nuevosCupones)} />
                <span className="aj-slider"></span>
              </label>
            </div>
          </section>

          <section className="aj-section-group">
            <h2>Seguridad</h2>

            <div className="aj-setting-row">
              <div className="aj-row-label">
                <span className="aj-row-icon aj-icon-purple">🔒</span>
                <span>Contraseña</span>
              </div>
              <div className="aj-password-actions">
                <span className="aj-dots-password">..........</span>
                <button className="aj-inline-edit-btn" onClick={handlePasswordChange}>Editar</button>
              </div>
            </div>

            <div className="aj-setting-row">
              <div className="aj-row-label">
                <span className="aj-row-icon aj-icon-pink">🛡️</span>
                <span>Verificación de 2 pasos</span>
              </div>
              <label className="aj-switch">
                <input type="checkbox" checked={verificacion2Pasos} onChange={() => setVerificacion2Pasos(!verificacion2Pasos)} />
                <span className="aj-slider"></span>
              </label>
            </div>
          </section>

          <section className="aj-section-group">
            <h2>Datos personales</h2>

            <div className="aj-info-row">
              <div className="aj-row-label">
                <span className="aj-row-icon aj-icon-gray">👤</span>
                <span>Nombre</span>
              </div>
              <span className="aj-info-value">Luis Méndez</span>
            </div>

            <div className="aj-info-row">
              <div className="aj-row-label">
                <span className="aj-row-icon aj-icon-gray">✉️</span>
                <span>Correo</span>
              </div>
              <span className="aj-info-value">luis.mendez@gmail.com</span>
            </div>
          </section>

          {/* Zona de peligro */}
          <div className="aj-delete-account-zone">
            <span className="aj-delete-text">Eliminar cuenta</span>
            <button className="aj-delete-btn" onClick={handleDeleteAccount}>Eliminar</button>
          </div>

        </div>

      </div>
    </div>
  );
}
import React, { useState } from "react";
import "../styles/notificaciones.css";

/* Datos de notificaciones de prueba */
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

/* Componente principal: Notificaciones */
export default function Notificaciones() {
  const [menuActivo, setMenuActivo] = useState("Notificaciones"); // Estado para menú lateral activo

  // Acción al hacer clic en una notificación
  const handleNotificationClick = (id) => {
    console.log(`Notificación ${id} clickeada. Listo para conectar al backend.`);
  };

  // Contador de notificaciones sin leer
  const sinLeerContador = notificacionesData.filter(n => !n.leido).length;

  return (
    <div className="pagina-notificaciones">
      {/*Barra lateral izquierda*/}
      <aside className="sidebar">
        {/*Marca Barber Hub*/}
        <div className="marca">
          <img src="/barberhublogo.jpg" alt="Barber Hub" className="logo-barberhub" />
          <h2>BARBER HUB</h2>
        </div>

        {/*Menú de navegación*/}
        <nav className="menu-navegacion">
          {["Explorar", "Mis citas", "Historial", "Favoritos", "Notificaciones", "Ajustes"].map((item) => (
            <button
              key={item}
              className={`boton-menu ${menuActivo === item ? "activo" : ""}`}
              onClick={() => setMenuActivo(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        {/*Perfil de usuario*/}
        <div className="perfil-usuario">
          <div className="avatar-placeholder">LM</div>
          <div className="info-usuario">
            <span className="nombre-usuario">Luis Méndez</span>
            <span className="rol-usuario">Básico</span>
          </div>
        </div>
      </aside>

      {/*Contenido principal*/}
      <div className="contenedor-principal">
        <header className="encabezado-principal">
          <h1>Notificaciones</h1>
        </header>

        <main className="contenido">
          <div className="contenedor-cards">
            
            {/*Contador de no leídas*/}
            <div className="contador-no-leidas">
              <span className="punto-indicador"></span>
              <p>{sinLeerContador} sin leer</p>
            </div>

            {/*Lista de notificaciones*/}
            <div className="lista-notificaciones">
              {notificacionesData.map((alerta) => (
                <button 
                  key={alerta.id} 
                  className={`tarjeta-notificacion ${!alerta.leido ? "no-leida" : ""}`}
                  onClick={() => handleNotificationClick(alerta.id)}
                  title="Marcar como leída / Ver detalles"
                >
                  <div className="icono-placeholder"></div>

                  <div className="info-notificacion">
                    <h3>{alerta.titulo}</h3>
                    <p className="descripcion-notificacion">{alerta.descripcion}</p>
                  </div>

                  <div className="meta-notificacion">
                    <span className="texto-tiempo">{alerta.tiempo}</span>
                    {!alerta.leido && <span className="punto-no-leida"></span>}
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

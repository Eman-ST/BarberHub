import React, { useState } from "react";
import "../styles/favoritos.css";

// Mock de datos extraído exactamente de tu captura de pantalla
const favoritosData = [
  {
    id: 1,
    nombre: "Barbería La Reforma",
    direccion: "Av. Sor Juana 142  0.8km",
    estado: "Abierto",
    calificacion: "4.7",
    imagen: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    nombre: "Barbería La Navaja clasica",
    direccion: "Av. Sor Juana 142  0.8km",
    estado: "Abierto",
    calificacion: "4.8",
    imagen: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    nombre: "Carlos Reyes",
    direccion: "Barbería Black Edge",
    estado: "Cerrado",
    calificacion: "4.9",
    imagen: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=200&auto=format&fit=crop"
  }
];

export default function Favoritos() {
  const [menuActivo, setMenuActivo] = useState("Favoritos");
  // Almacenamos el ID de la tarjeta seleccionada (para el borde azul del item #2)
  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(2);

  return (
    <div className="fav-dashboard">
      {/* Sidebar Izquierdo Oscuro */}
      <aside className="fav-sidebar-left">
        <div className="fav-brand">
          <img src="/barberhublogo.jpg" alt="Barber Hub" className="fav-logo-img" />
          <h2>BARBER HUB</h2>
        </div>

        <nav className="fav-nav-menu">
          {["Explorar", "Mis citas", "Historial", "Favoritos", "Notificaciones", "Ajustes"].map((item) => (
            <button
              key={item}
              className={`fav-nav-btn ${menuActivo === item ? "activo" : ""}`}
              onClick={() => setMenuActivo(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Perfil del Usuario en la parte inferior */}
        <div className="fav-user-profile">
          <div className="fav-avatar-placeholder">LM</div>
          <div className="fav-user-info">
            <span className="fav-user-name">Luis Méndez</span>
            <span className="fav-user-role">Básico</span>
          </div>
        </div>
      </aside>

      {/* Contenedor Principal (Entorno Blanco) */}
      <div className="fav-main-wrapper">
        <header className="fav-main-header">
          <h1>Favoritos</h1>
        </header>

        <main className="fav-content-layout">
          <div className="fav-cards-container">
            {favoritosData.map((barberia) => (
              <div
                key={barberia.id}
                className={`fav-card-item ${tarjetaSeleccionada === barberia.id ? "seleccionada" : ""}`}
                onClick={() => setTarjetaSeleccionada(barberia.id)}
              >
                {/* Imagen en miniatura */}
                <img src={barberia.imagen} alt={barberia.nombre} className="fav-item-img" />

                {/* Detalles centrales */}
                <div className="fav-item-info">
                  <h3>{barberia.nombre}</h3>
                  <p className="fav-item-address">{barberia.direccion}</p>
                  <div className="fav-status-row">
                    <span className={`fav-status-dot ${barberia.estado.toLowerCase()}`}></span>
                    <span className="fav-status-text">{barberia.estado}</span>
                  </div>
                </div>

                {/* Acciones del extremo derecho */}
                <div className="fav-item-actions">
                  <span className="fav-rating-number">{barberia.calificacion}</span>
                  <div className="fav-buttons-group">
                    <button className="fav-btn-action fav-btn-gold">Agendar</button>
                    <button className="fav-btn-action fav-btn-gray">Ver barbería</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
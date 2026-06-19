import React, { useState } from "react";
import "../styles/favoritos.css";

// Mock de datos de barberías favoritas
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
    nombre: "Barbería La Navaja clásica",
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
  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState(2);

  return (
    <div className="panel-favoritos">
      {/* Sidebar izquierdo oscuro */}
      <aside className="sidebar-favoritos">
        {/* Marca Barber Hub */}
        <div className="marca-favoritos">
          <img src="/barberhublogo.jpg" alt="Barber Hub" className="logo-favoritos" />
          <h2>BARBER HUB</h2>
        </div>

        {/* Menú de navegación */}
        <nav className="menu-favoritos">
          {["Explorar", "Mis citas", "Historial", "Favoritos", "Notificaciones", "Ajustes"].map((item) => (
            <button
              key={item}
              className={`btn-menu-favoritos ${menuActivo === item ? "activo" : ""}`}
              onClick={() => setMenuActivo(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Perfil del usuario en la parte inferior */}
        <div className="perfil-favoritos">
          <div className="avatar-favoritos">LM</div>
          <div className="info-usuario-favoritos">
            <span className="nombre-usuario-favoritos">Luis Méndez</span>
            <span className="rol-usuario-favoritos">Básico</span>
          </div>
        </div>
      </aside>

      {/* Contenedor principal blanco */}
      <div className="contenido-favoritos">
        <header className="encabezado-favoritos">
          <h1>Favoritos</h1>
        </header>

        <main className="layout-favoritos">
          <div className="tarjetas-favoritos">
            {favoritosData.map((barberia) => (
              <div
                key={barberia.id}
                className={`tarjeta-favorito ${tarjetaSeleccionada === barberia.id ? "seleccionada" : ""}`}
                onClick={() => setTarjetaSeleccionada(barberia.id)}
              >
                {/* Imagen miniatura */}
                <img src={barberia.imagen} alt={barberia.nombre} className="imagen-favorito" />

                {/* Información central */}
                <div className="info-favorito">
                  <h3>{barberia.nombre}</h3>
                  <p className="direccion-favorito">{barberia.direccion}</p>
                  <div className="estado-favorito">
                    <span className={`punto-estado ${barberia.estado.toLowerCase()}`}></span>
                    <span className="texto-estado">{barberia.estado}</span>
                  </div>
                </div>

                {/* Acciones a la derecha */}
                <div className="acciones-favorito">
                  <span className="calificacion-favorito">{barberia.calificacion}</span>
                  <div className="grupo-botones-favorito">
                    <button className="btn-favorito btn-dorado">Agendar</button>
                    <button className="btn-favorito btn-gris">Ver barbería</button>
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

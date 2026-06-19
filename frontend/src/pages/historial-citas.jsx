import  { useState } from "react";
// Importación exacta con el nombre en minúsculas que me enseñaste:
import "../styles/historial-citas.css";

// Mock de datos basado en tu interfaz gráfica
const citasData = [
  {
    id: 1,
    servicio: "Corte + Barba",
    barbero: "Carlos Reyes",
    barberia: "Barbería La Reforma",
    direccion: "Av. Sor Juana 142 0.8km",
    imagen: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=200&auto=format&fit=crop", 
    tiempo: "hace 2 días",
    fecha: "26 de mayo 2026",
    hora: "11:00 am",
    precio: 130,
    estado: "Pendiente", 
    duracion: "1 Hora",
    puntosGanados: "+10 pts",
    miCalificacion: "Excelente servicio, buen corte... Carlos siempre deja todo impecable y el lugar esta muy limpio"
  },
  {
    id: 2,
    servicio: "Corte Clasico",
    barbero: "Carlos Reyes",
    barberia: "Barbería La Reforma",
    direccion: "Av. Sor Juana 142 0.8km",
    imagen: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=200&auto=format&fit=crop",
    tiempo: "hace 1 mes",
    fecha: "25 de abril 2026",
    hora: "04:30 pm",
    precio: 100,
    estado: "Completada",
    duracion: "45 Min",
    puntosGanados: "+10 pts",
    miCalificacion: "Muy buen corte tradicional."
  },
  {
    id: 3,
    servicio: "Corte Clasico",
    barbero: "Miguel G",
    barberia: "Barbería La Navaja",
    direccion: "Calle Benito Juárez 405",
    imagen: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=200&auto=format&fit=crop",
    tiempo: "hace 1 mes",
    fecha: "24 de abril 2026",
    hora: "10:00 am",
    precio: 120,
    estado: "Rechazada",
    duracion: "40 Min",
    puntosGanados: "0 pts",
    miCalificacion: ""
  }
];

// Mantenemos el nombre de la función en Mayúscula (Obligatorio para React)
export default function HistorialCitas() {
  const [filtroEstado, setFiltroEstado] = useState("Todas");
  const [citaSeleccionada, setCitaSeleccionada] = useState(citasData[0]);
  const [menuActivo, setMenuActivo] = useState("Historial");

  // Filtrar citas según el botón seleccionado
  const citasFiltradas = citasData.filter((cita) => {
    if (filtroEstado === "Todas") return true;
    if (filtroEstado === "Canceladas") return cita.estado === "Rechazada";
    return cita.estado === filtroEstado;
  });

  // Helper para asignar la clase CSS del badge de estado
  const getBadgeClass = (estado) => {
    switch (estado) {
      case "Pendiente": return "hc-status-pendiente";
      case "Completada": return "hc-status-completada";
      case "Rechazada": return "hc-status-rechazada";
      default: return "";
    }
  };

  return (
    <div className="hc-dashboard">
      {/* 1. Sidebar de Navegación Lateral */}
      <aside className="hc-sidebar-left">
        <div className="hc-brand">
          <img src="/barberhublogo.jpg" alt="Barber Hub" className="hc-logo-img" />
          <h2>BARBER HUB</h2>
        </div>
        <nav className="hc-nav-menu">
          {["Explorar", "Mis citas", "Historial", "Favoritos", "Notificaciones", "Ajustes"].map((item) => (
            <button
              key={item}
              className={`hc-nav-btn ${menuActivo === item ? "activo" : ""}`}
              onClick={() => setMenuActivo(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Contenedor Principal Derecho */}
      <div className="hc-main-wrapper">
        {/* Header Superior */}
        <header className="hc-main-header">
          <h1>Historial de citas</h1>
        </header>

        <div className="hc-content-layout">
          {/* 2. Sección Central: Métricas, Filtros y Lista */}
          <main className="hc-center-content">
            {/* Tarjetas de Resumen (Métricas) */}
            <div className="hc-summary-cards">
              <div className="hc-card">
                <span className="hc-card-number text-gold">14</span>
                <span className="hc-card-label">Total visitas</span>
              </div>
              <div className="hc-card">
                <span className="hc-card-number text-gold">$ 1,480</span>
                <span className="hc-card-label">Gastado Total</span>
              </div>
              <div className="hc-card">
                <span className="hc-card-number">4.9</span>
                <span className="hc-card-label">Calificación dada</span>
              </div>
            </div>

            {/* Filtros de Citas */}
            <div className="hc-filters">
              {["Todas", "Completadas", "Canceladas", "Pendientes"].map((status) => (
                <button
                  key={status}
                  className={`hc-filter-btn ${filtroEstado === status ? "activo" : ""}`}
                  onClick={() => setFiltroEstado(status)}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Listado de Citas */}
            <div className="hc-appointments-list">
              {citasFiltradas.map((cita) => (
                <div key={cita.id} className="hc-appointment-item">
                  <img src={cita.imagen} alt={cita.barberia} className="hc-item-img" />
                  
                  <div className="hc-item-info">
                    <h3>{cita.servicio} . {cita.barbero}</h3>
                    <p>{cita.barberia} . {cita.tiempo}</p>
                  </div>

                  <div className="hc-item-actions">
                    <span className="hc-item-price">${cita.precio}</span>
                    <span className="hc-item-date">{cita.fecha}</span>
                    <div className="hc-actions-row">
                      <button 
                        className="hc-btn-details"
                        onClick={() => setCitaSeleccionada(cita)}
                      >
                        Ver detalle
                      </button>
                      <span className={`hc-status-badge ${getBadgeClass(cita.estado)}`}>
                        {cita.estado}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {citasFiltradas.length === 0 && (
                <p className="hc-empty-message">No se encontraron citas en esta categoría.</p>
              )}
            </div>
          </main>

          {/* 3. Sidebar Derecho: Detalle de Cita */}
          {citaSeleccionada && (
            <aside className="hc-sidebar-right">
              <div className="hc-detail-box">
                <h3 className="hc-detail-title">Detalle de cita</h3>
                <p className="hc-detail-timestamp">{citaSeleccionada.fecha} {citaSeleccionada.hora}</p>

                {/* Info Barbería */}
                <div className="hc-detail-shop-card">
                  <span className="hc-icon-scissors">✂</span>
                  <div>
                    <h4>{citaSeleccionada.barberia}</h4>
                    <p>{citaSeleccionada.direccion}</p>
                  </div>
                </div>

                {/* Tabla de especificaciones */}
                <div className="hc-detail-table">
                  <div className="hc-table-row">
                    <span>Servicio</span>
                    <strong>{citaSeleccionada.servicio}</strong>
                  </div>
                  <div className="hc-table-row">
                    <span>Barbero</span>
                    <strong>{citaSeleccionada.barbero}</strong>
                  </div>
                  <div className="hc-table-row">
                    <span>Duración</span>
                    <strong>{citaSeleccionada.duracion}</strong>
                  </div>
                  <hr className="hc-divider" />
                  <div className="hc-table-row">
                    <span>Total Pagado</span>
                    <strong className="text-gold">${citaSeleccionada.precio}</strong>
                  </div>
                  <div className="hc-table-row">
                    <span>Puntos Ganados</span>
                    <strong className="text-gold">{citaSeleccionada.puntosGanados}</strong>
                  </div>
                </div>

                {/* Reseña/Calificación */}
                {citaSeleccionada.miCalificacion && (
                  <div className="hc-detail-review">
                    <h5>Mi calificación</h5>
                    <p>"{citaSeleccionada.miCalificacion}"</p>
                  </div>
                )}

                {/* Botones de acción inferiores */}
                <div className="hc-detail-actions">
                  <button className="hc-btn-rebook">Volver a agendar</button>
                  <button className="hc-btn-go-shop">Ver barbería</button>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
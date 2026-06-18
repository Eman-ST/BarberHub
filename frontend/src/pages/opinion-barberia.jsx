import { useState } from "react";
import "../styles/opinion-barberia.css";

const opiniones = [
  {
    id: 1,
    nombre: "Alexis Duran",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    tiempo: "Hace 1 hora",
    comentario: "Alexis siempre me deja  el corte perfecto. ¡Muy recomendado el lugar!",
  },
  {
    id: 2,
    nombre: "Marco Pedraza",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
    tiempo: "Hace 2 días",
    comentario: "Servicio execelente, siempre quedo muy satisfecho.",
  },
  {
    id: 3,
    nombre: "Yahir Hernandez",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    rating: 5,
    tiempo: "12 de mayo",
    comentario: "El lugar es genial y los bareberos profesionales.",
  },
];

function Estrellas({ rating, size = "normal" }) {
  return (
    <span className={`bp-estrellas ${size}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? "estrella llena" : "estrella"}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function OpinionBarberia() {
  const [tabActiva, setTabActiva] = useState("barberia"); // "barberos" | "barberia"
  const [filtroEstrellas, setFiltroEstrellas] = useState("todas");

  return (
    <div className="bp-page">
      {/* Header */}
      <header className="bp-header">
      <img src="/barberhublogo.jpg" alt="Barber Hub" className="bp-logo" />
      </header>

      <div className="bp-content">
        {/* Encabezado de la barbería */}
        <div className="bp-titulo-row">
          <div>
            <h1 className="bp-nombre">Urban Cuts</h1>
            <div className="bp-rating-row">
              <Estrellas rating={5} />
              <span className="bp-opiniones">(220 opiniones)</span>
            </div>
            <div className="bp-direccion">
              <span className="bp-check">✔</span>
              Blvd. 10 de mayo, Puebla
            </div>
          </div>

          <div className="bp-tabs">
            <button
              className={`bp-tab ${tabActiva === "barberos" ? "" : "inactivo"} ${
                tabActiva === "barberos" ? "activo" : ""
              }`}
              onClick={() => setTabActiva("barberos")}
            >
              Comentarios Barberos
            </button>
            <button
              className={`bp-tab ${tabActiva === "barberia" ? "activo" : "inactivo"}`}
              onClick={() => setTabActiva("barberia")}
            >
              Comentarios Barbería
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="bp-filtros">
          <span className="bp-filtros-label">Filtrar por:</span>

          <button
            className={`bp-filtro-btn ${filtroEstrellas === "todas" ? "activo" : ""}`}
            onClick={() => setFiltroEstrellas("todas")}
          >
            Todas
          </button>

          <button
            className={`bp-filtro-estrellas ${filtroEstrellas === 5 ? "activo" : ""}`}
            onClick={() => setFiltroEstrellas(5)}
          >
            <Estrellas rating={5} />
          </button>

          <button
            className={`bp-filtro-estrellas ${filtroEstrellas === 4 ? "activo" : ""}`}
            onClick={() => setFiltroEstrellas(4)}
          >
            <Estrellas rating={4} />
          </button>

          <button
            className={`bp-filtro-estrellas ${filtroEstrellas === 3 ? "activo" : ""}`}
            onClick={() => setFiltroEstrellas(3)}
          >
            <Estrellas rating={3} />
          </button>

          <button className="bp-orden-btn">
            Más recientes <span className="bp-chevron">&gt;</span>
          </button>
        </div>

        {/* Lista de opiniones */}
        <div className="bp-opiniones-lista">
          {opiniones.map((op) => (
            <div key={op.id} className="bp-opinion">
              <img src={op.avatar} alt={op.nombre} className="bp-avatar" />
              <div className="bp-opinion-cuerpo">
                <div className="bp-opinion-header">
                  <span className="bp-opinion-nombre">{op.nombre}</span>
                  <Estrellas rating={op.rating} size="small" />
                  <span className="bp-opinion-tiempo">{op.tiempo}</span>
                </div>
                <p className="bp-opinion-texto">{op.comentario}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Botones de acción */}
        <div className="bp-acciones">
          <button className="bp-btn bp-btn-regresar">Regresar</button>
          <button className="bp-btn bp-btn-opinion">
            <span className="bp-icono-chat">💬</span> Dejar opinión
          </button>
        </div>
      </div>
    </div>
  );
}
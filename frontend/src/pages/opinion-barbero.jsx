import { useState } from "react";
import "../styles/opinion-barbero.css";

const barberos = [
  { id: 1, nombre: "Alexis Duran", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, nombre: "Marco Pedraza", foto: "https://randomuser.me/api/portraits/men/45.jpg" },
  { id: 3, nombre: "Yahir Hernandez", foto: "https://randomuser.me/api/portraits/men/12.jpg" },
  { id: 4, nombre: "Javier Lopez", foto: "https://randomuser.me/api/portraits/men/22.jpg" },
  { id: 5, nombre: "David Rodriguez", foto: "https://randomuser.me/api/portraits/men/52.jpg" },
  { id: 6, nombre: "Juan Sanchez", foto: "https://randomuser.me/api/portraits/men/61.jpg" },
];

export default function OpinionBarbero() {
  const [barberoSeleccionado, setBarberoSeleccionado] = useState(barberos[0]);
  const [rating, setRating] = useState(5);
  const [comentario, setComentario] = useState("");
  const maxCaracteres = 1000;

  return (
    <div className="ve-page">
      {/* Header */}
      <header className="ve-header">
        <img src="/barberhublogo.jpg" alt="Barber Hub" className="ve-logo" />
      </header>

      <div className="ve-content">
        <h1 className="ve-titulo">
          Valora tu experiencia
          <br />
          con nosotros
        </h1>

        <div className="ve-cuerpo">
          {/* Selección de barbero */}
          <div className="ve-barberos">
            <h2 className="ve-subtitulo">Selecciona a tu barbero</h2>

            <div className="ve-barberos-grid">
              {barberos.map((b) => (
                <button
                  key={b.id}
                  className={`ve-barbero ${
                    barberoSeleccionado.id === b.id ? "seleccionado" : ""
                  }`}
                  onClick={() => setBarberoSeleccionado(b)}
                >
                  <img src={b.foto} alt={b.nombre} className="ve-barbero-foto" />
                  <span className="ve-barbero-nombre">{b.nombre}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tarjeta de opinión */}
          <div className="ve-card">
            <img
              src={barberoSeleccionado.foto}
              alt={barberoSeleccionado.nombre}
              className="ve-card-foto"
            />
            <h3 className="ve-card-nombre">{barberoSeleccionado.nombre}</h3>
            <p className="ve-card-subtitulo">Tu opinión es importante</p>

            <div className="ve-estrellas">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`ve-estrella ${i < rating ? "llena" : ""}`}
                  onClick={() => setRating(i + 1)}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="ve-textarea-wrapper">
              <textarea
                className="ve-textarea"
                placeholder="Escribe tu comentario aquí..."
                maxLength={maxCaracteres}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
              {comentario === "" && (
                <span className="ve-textarea-hint">
                  Comparte tu experiencia con {barberoSeleccionado.nombre}.
                </span>
              )}
              <span className="ve-contador">
                {comentario.length}/{maxCaracteres}
              </span>
            </div>

            <button className="ve-btn-enviar">Enviar mi comentario</button>
          </div>
        </div>

        <div className="ve-comentario-general">
          <span>Hacer comentario general a la barbería</span>
        </div>
      </div>
    </div>
  );
}
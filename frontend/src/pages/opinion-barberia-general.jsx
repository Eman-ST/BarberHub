import React, { useState } from "react";
import "../styles/opinion-barberia-general.css";

export default function OpinionBarberiaGeneral() {
  const [rating, setRating] = useState(5);
  const [comentario, setComentario] = useState("");
  const maxCaracteres = 1000;

  return (
    <div className="obg-page">
      {/* Header */}
      <header className="obg-header">
        <img src="/logo.png" alt="Barber Hub" className="obg-logo" />
      </header>

      <div className="obg-content">
        <h1 className="obg-titulo">
          Valora tu experiencia
          <br />
          con nosotros
        </h1>

        {/* Tarjeta principal */}
        <div className="obg-card">
          {/* Logo de la barbería (botón) */}
          <button className="obg-barberia-logo-btn">
            <img
              src="/logo-ejemplo.png"
              alt="Logo barbería"
              className="obg-barberia-logo"
            />
          </button>

          {/* Formulario */}
          <div className="obg-formulario">
            <div className="obg-linea-top" />
            <h2 className="obg-nombre">Urban Cuts</h2>
            <p className="obg-subtitulo">Valora el establecimiento</p>

            <div className="obg-estrellas">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`obg-estrella ${i < rating ? "llena" : ""}`}
                  onClick={() => setRating(i + 1)}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="obg-textarea-wrapper">
              <textarea
                className="obg-textarea"
                placeholder="Escribe tu comentario general aquí..."
                maxLength={maxCaracteres}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
              />
              {comentario === "" && (
                <span className="obg-textarea-hint">
                  Comparte tu experiencia en el establecimiento, servicio general,
                  ambiente o cualquier aspecto de la barbería.
                </span>
              )}
              <span className="obg-contador">
                {comentario.length}/{maxCaracteres}
              </span>
            </div>

            <button className="obg-btn-enviar">
              Enviar comentario a la barbería
            </button>
          </div>
        </div>

        {/* Botón regresar */}
        <div className="obg-footer">
          <button className="obg-btn-regresar">Regresar</button>
          <button className="obg-btn-comentario-barbero">
            Hacer comentario general al barbero
          </button>
        </div>
      </div>
    </div>
  );
}
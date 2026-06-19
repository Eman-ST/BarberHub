import React from "react";
import "../styles/comentario-enviado.css";

export default function ComentarioEnviado() {
  return (
    <div className="ce-page">
      <div className="ce-card">
        <img src="/logo-ejemplo.png" alt="Barber Hub" className="ce-logo" />

        <h1 className="ce-titulo">¡Gracias por tu comentario!</h1>

        <p className="ce-texto">
          Tu opinión genera sobre "Urban Cuts"
          <br />
          ha sido enviada con éxito.
        </p>

        <button className="ce-btn-aceptar">A c e p t a r</button>
      </div>
    </div>
  );
}
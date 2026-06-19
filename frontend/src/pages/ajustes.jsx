import React, { useState } from "react";
import "../styles/ajustes.css";

export default function Ajustes() {
  const [menuActivo, setMenuActivo] = useState("Ajustes");
  
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
    <div className="pagina-ajustes">
      <aside className="sidebar-ajustes">
        <div className="marca-ajustes">
          <img src="/barberhublogo.jpg" alt="Barber Hub" className="logo-ajustes" />
          <h2>BARBER HUB</h2>
        </div>

        <nav className="menu-ajustes">
          {["Explorar", "Mis citas", "Historial", "Favoritos", "Notificaciones", "Ajustes"].map((item) => (
            <button
              key={item}
              className={`boton-menu-ajustes ${menuActivo === item ? "activo" : ""}`}
              onClick={() => setMenuActivo(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="perfil-ajustes">
          <div className="avatar-ajustes">LM</div>
          <div className="info-usuario-ajustes">
            <span className="nombre-usuario-ajustes">Luis Méndez</span>
            <span className="rol-usuario-ajustes">Básico</span>
          </div>
        </div>
      </aside>

      <div className="contenedor-ajustes">
        <header className="encabezado-ajustes">
          <h1>Mi perfil y Ajustes</h1>
        </header>

        <main className="contenido-ajustes">
          <div className="ajustes-grid">
            
            <div className="columna-izquierda-ajustes">
              
              <div className="tarjeta-perfil">
                <div className="avatar-perfil">LM</div>
                <h3>Luis Méndez</h3>
                <p>luis.mendez@gmail.com</p>
                <span className="badge-estado">Cliente básico</span>
              </div>

              <button className="boton-cambiar-foto">
                <span>Cambiar foto de perfil</span>
                <span className="icono-foto">🖼️</span>
              </button>

              {/* Grid de Métricas convertido a botones para desglosar datos */}
              <div className="grid-estadisticas">
                <button className="boton-estadistica" onClick={() => handleStatClick("visitas")}>
                  <strong>6</strong>
                  <span>Visitas</span>
                </button>
                <button className="boton-estadistica" onClick={() => handleStatClick("puntos")}>
                  <strong>50</strong>
                  <span>Puntos</span>
                </button>
                <button className="boton-estadistica" onClick={() => handleStatClick("calificacion")}>
                  <strong>4.8</strong>
                  <span>Calificación</span>
                </button>
              </div>

            </div>

            <div className="columna-derecha-ajustes">
              
              <section className="seccion-ajustes">
                <h2>Notificaciones</h2>
                
                <div className="fila-ajuste">
                  <div className="etiqueta-ajuste">
                    <span className="icono-ajuste naranja">🔔</span>
                    <span>Recordatorio de cita</span>
                  </div>
                  <label className="switch-ajuste">
                    <input type="checkbox" checked={recordatorio} onChange={() => setRecordatorio(!recordatorio)} />
                    <span className="slider-ajuste"></span>
                  </label>
                </div>

                <div className="fila-ajuste">
                  <div className="etiqueta-ajuste">
                    <span className="icono-ajuste azul">✔️</span>
                    <span>Cita confirmada</span>
                  </div>
                  <label className="switch-ajuste">
                    <input type="checkbox" checked={citaConfirmada} onChange={() => setCitaConfirmada(!citaConfirmada)} />
                    <span className="slider-ajuste"></span>
                  </label>
                </div>

                <div className="fila-ajuste">
                  <div className="etiqueta-ajuste">
                    <span className="icono-ajuste verde">🎫</span>
                    <span>Nuevos cupones</span>
                  </div>
                  <label className="switch-ajuste">
                    <input type="checkbox" checked={nuevosCupones} onChange={() => setNuevosCupones(!nuevosCupones)} />
                    <span className="slider-ajuste"></span>
                  </label>
                </div>
              </section>

              <section className="seccion-ajustes">
                <h2>Seguridad</h2>

                <div className="fila-ajuste">
                  <div className="etiqueta-ajuste">
                    <span className="icono-ajuste morado">🔒</span>
                    <span>Contraseña</span>
                  </div>
                  <div className="acciones-password">
                    <span className="dots-password">..........</span>
                    <button className="boton-editar-inline" onClick={handlePasswordChange}>Editar</button>
                  </div>
                </div>

                <div className="fila-ajuste">
                  <div className="etiqueta-ajuste">
                    <span className="icono-ajuste rosa">🛡️</span>
                    <span>Verificación de 2 pasos</span>
                  </div>
                  <label className="switch-ajuste">
                    <input type="checkbox" checked={verificacion2Pasos} onChange={() => setVerificacion2Pasos(!verificacion2Pasos)} />
                    <span className="slider-ajuste"></span>
                  </label>
                </div>
              </section>

              <section className="seccion-ajustes">
                <h2>Datos personales</h2>

                <div className="fila-info">
                  <div className="etiqueta-ajuste">
                    <span className="icono-ajuste gris">👤</span>
                    <span>Nombre</span>
                  </div>
                  <span className="valor-info">Luis Méndez</span>
                </div>

                <div className="fila-info">
                  <div className="etiqueta-ajuste">
                    <span className="icono-ajuste gris">✉️</span>
                    <span>Correo</span>
                  </div>
                  <span className="valor-info">luis.mendez@gmail.com</span>
                </div>
              </section>

              {/* Fila inferior de peligro unificada */}
              <div className="zona-eliminar">
                <span className="texto-eliminar">Eliminar cuenta</span>
                <button className="boton-eliminar" onClick={handleDeleteAccount}>Eliminar</button>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

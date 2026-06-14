import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Scissors, Clock, CheckCircle2, X } from "lucide-react";
import { apiFetch } from "../utils/api";
import SidebarLayout from "../components/sidebar-layout";
import "../styles/mis-citas.css";

export default function MisCitas() {
  const navigate = useNavigate();
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  useEffect(() => {
    const cargarCitas = async () => {
      try {
        const data = await apiFetch("/citas/mias");
        setCitas(data.citas ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargarCitas();
  }, []);

  const handleCancelar = async (citaId) => {
    if (!window.confirm("¿Estás seguro de que deseas cancelar esta cita?")) {
      return;
    }

    try {
      await apiFetch(`/citas/${citaId}`, { method: "DELETE" });
      setCitas(citas.filter((c) => c.id !== citaId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleVerDetalles = async (cita) => {
    try {
      const data = await apiFetch(`/citas/${cita.id}`);
      setCitaSeleccionada(data.cita);
      setMostrarDetalles(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const cerrarModal = () => {
    setMostrarDetalles(false);
    setCitaSeleccionada(null);
  };

  if (cargando) {
    return (
      <SidebarLayout>
        <div className="mis-citas-wrapper">
          <div className="mis-citas-loading">
            <div className="mis-citas-spinner"></div>
            <p>Cargando tus citas...</p>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  if (error) {
    return (
      <SidebarLayout>
        <div className="mis-citas-wrapper">
          <div className="mis-citas-error">
            <p>⚠️ {error}</p>
            <button className="mis-citas-btn-primary" onClick={() => navigate("/explorar")}>
              Explorar barberías
            </button>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  // Datos de ejemplo para el prototipo (se reemplazarán con datos reales de la API)
  const citasEjemplo = [
    {
      id: 1,
      servicio: "Corte Clásico",
      barbero: "Carlos Reyes",
      barberia: "Black Edge Barber",
      fecha: "2026-06-21",
      hora: "11:00",
      estado: "pendiente",
      tiempoEspera: "10 min",
      progreso: ["enviada", "revisada"],
      precio: "$80",
      moneda: "MXN"
    },
    {
      id: 2,
      servicio: "Corte + Barba",
      barbero: "Miguel González",
      barberia: "La Navaja Clásica",
      fecha: "2026-06-24",
      hora: "15:00",
      estado: "confirmada",
      tiempoEspera: "en 3 días",
      progreso: ["enviada", "aceptada", "confirmada"],
      precio: "$120",
      moneda: "MXN"
    }
  ];

  const citasAMostrar = citas.length > 0 ? citas : citasEjemplo;

  return (
    <SidebarLayout>
      <div className="mis-citas-wrapper">
        <div className="mis-citas-header">
          <h1 className="mis-citas-title">Mis Citas</h1>
          <p className="mis-citas-subtitle">Gestiona tus reservas de barbería</p>
        </div>

        {citasAMostrar.length === 0 ? (
          <div className="mis-citas-empty">
            <Scissors className="mis-citas-empty-icon" />
            <h3>No tienes citas pendientes</h3>
            <p>Explora barberías y agenda tu próximo corte</p>
            <button className="mis-citas-btn-primary" onClick={() => navigate("/explorar")}>
              Explorar barberías
            </button>
          </div>
        ) : (
          <div className="mis-citas-grid">
            {citasAMostrar.map((cita) => (
              <div key={cita.id} className="mis-citas-card">
                <div className="mis-citas-card-header">
                  <div className="mis-citas-card-icon">
                    <Scissors size={24} />
                  </div>
                  <div className="mis-citas-card-status">
                    {cita.estado === "pendiente" ? (
                      <span className="mis-citas-status-badge pending">
                        <Clock size={14} />
                        Pendiente
                      </span>
                    ) : (
                      <span className="mis-citas-status-badge confirmed">
                        <CheckCircle2 size={14} />
                        Confirmada
                      </span>
                    )}
                  </div>
                </div>

                <div className="mis-citas-card-body">
                  <h3 className="mis-citas-card-servicio">{cita.servicio}</h3>
                  <p className="mis-citas-card-barbero">con {cita.barbero}</p>
                  <p className="mis-citas-card-barberia">{cita.barberia}</p>
                  
                  <div className="mis-citas-card-datetime">
                    <span className="mis-citas-card-date">{cita.fecha}</span>
                    <span className="mis-citas-card-time">{cita.hora}</span>
                  </div>

                  <div className="mis-citas-card-progress">
                    <div className={`mis-citas-progress-dot ${cita.progreso?.includes("enviada") ? "active" : ""}`}>
                      <span className="mis-citas-progress-label">Enviada</span>
                    </div>
                    <div className={`mis-citas-progress-dot ${cita.progreso?.includes("revisada") || cita.progreso?.includes("aceptada") ? "active" : ""}`}>
                      <span className="mis-citas-progress-label">{cita.progreso?.includes("revisada") ? "Revisada" : "Aceptada"}</span>
                    </div>
                    <div className={`mis-citas-progress-dot ${cita.progreso?.includes("confirmada") ? "active" : ""}`}>
                      <span className="mis-citas-progress-label">Confirmada</span>
                    </div>
                    <div className={`mis-citas-progress-dot ${cita.progreso?.includes("completada") ? "active" : ""}`}>
                      <span className="mis-citas-progress-label">Completada</span>
                    </div>
                  </div>
                </div>

                <div className="mis-citas-card-footer">
                  <div className="mis-citas-card-price">
                    {cita.precio}
                  </div>
                  <div className="mis-citas-card-actions">
                    <button 
                      className="mis-citas-btn-view"
                      onClick={() => handleVerDetalles(cita)}
                    >
                      Ver detalles
                    </button>
                    <button 
                      className="mis-citas-btn-cancel"
                      onClick={() => handleCancelar(cita.id)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de detalles */}
        {mostrarDetalles && citaSeleccionada && (
          <div className="mis-citas-modal-overlay" onClick={cerrarModal}>
            <div className="mis-citas-modal" onClick={(e) => e.stopPropagation()}>
              <div className="mis-citas-modal-header">
                <h2 className="mis-citas-modal-title">Detalles de la Cita</h2>
                <button className="mis-citas-modal-close" onClick={cerrarModal}>
                  <X size={24} />
                </button>
              </div>
              <div className="mis-citas-modal-body">
                <div className="mis-citas-modal-detail">
                  <span className="mis-citas-modal-label">Servicio:</span>
                  <span className="mis-citas-modal-value">{citaSeleccionada.servicio}</span>
                </div>
                <div className="mis-citas-modal-detail">
                  <span className="mis-citas-modal-label">Barbería:</span>
                  <span className="mis-citas-modal-value">{citaSeleccionada.establecimiento}</span>
                </div>
                <div className="mis-citas-modal-detail">
                  <span className="mis-citas-modal-label">Fecha:</span>
                  <span className="mis-citas-modal-value">{citaSeleccionada.fecha}</span>
                </div>
                <div className="mis-citas-modal-detail">
                  <span className="mis-citas-modal-label">Hora:</span>
                  <span className="mis-citas-modal-value">{citaSeleccionada.hora}</span>
                </div>
                <div className="mis-citas-modal-detail">
                  <span className="mis-citas-modal-label">Precio:</span>
                  <span className="mis-citas-modal-value">{citaSeleccionada.moneda} {citaSeleccionada.precio}</span>
                </div>
                <div className="mis-citas-modal-detail">
                  <span className="mis-citas-modal-label">Estado:</span>
                  <span className="mis-citas-modal-value">{citaSeleccionada.estado}</span>
                </div>
                <div className="mis-citas-modal-detail">
                  <span className="mis-citas-modal-label">Nombre:</span>
                  <span className="mis-citas-modal-value">{citaSeleccionada.nombre}</span>
                </div>
                <div className="mis-citas-modal-detail">
                  <span className="mis-citas-modal-label">Teléfono:</span>
                  <span className="mis-citas-modal-value">{citaSeleccionada.telefono}</span>
                </div>
              </div>
              <div className="mis-citas-modal-footer">
                <button className="mis-citas-btn-primary" onClick={cerrarModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
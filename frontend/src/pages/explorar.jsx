import { useState, useEffect, useMemo } from 'react';
import { MapPin, Star, Search, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { BARBERIAS, generarSlots } from "../data/barberias";
import { getStoredUser } from "../utils/api";
import "../styles/explorar.css";

const calcularDistancia = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  return parseFloat((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))).toFixed(1));
};

export default function Explorar() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const [ubicacion, setUbicacion] = useState(null);
  const [radio, setRadio] = useState(15);
  const [filtroZona, setFiltroZona] = useState('');
  const [filtroServicio, setFiltroServicio] = useState('');

  // ── 1. GEOLOCALIZACIÓN ─────────────────────────────────────────────────────
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUbicacion([pos.coords.latitude, pos.coords.longitude]);
        },
        async () => {
          try {
            const res = await fetch('https://get.geojs.io/v1/ip/geo.json');
            const data = await res.json();
            if (data.latitude && data.longitude) {
              setUbicacion([parseFloat(data.latitude), parseFloat(data.longitude)]);
            } else {
              setUbicacion([19.043, -98.201]);
            }
          } catch {
            setUbicacion([19.043, -98.201]);
          }
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    } else {
      setTimeout(() => {
        setUbicacion([19.043, -98.201]);
      }, 0);
    }
  }, []);

  // ── 2. FILTRAR BARBERÍAS REGISTRADAS POR DISTANCIA ────────────────────────
  const barberiasCercanas = useMemo(() => {
    if (!ubicacion) return [];

    const [lat, lon] = ubicacion;

    return BARBERIAS
      .filter((b) => b.abierto)
      .map((b) => ({
        ...b,
        dist: calcularDistancia(lat, lon, b.lat, b.lng),
      }))
      .filter((b) => b.dist <= radio)
      .sort((a, b) => a.dist - b.dist);
  }, [ubicacion, radio]);

  // ── 3. FILTRO POR ZONA ─────────────────────────────────────────────────────
  const barberiasFiltradas = barberiasCercanas.filter((b) => {
    if (!filtroZona) return true;
    const termino = filtroZona.toLowerCase();
    return (
      b.nombre.toLowerCase().includes(termino) ||
      b.direccion.toLowerCase().includes(termino)
    );
  });

  // ── PANTALLA DE CARGA ──────────────────────────────────────────────────────
  if (!ubicacion) {
    return (
      <div className="explorar-loading">
        <div className="explorar-spinner"></div>
        <p>Ubicándote en el mapa...</p>
      </div>
    );
  }

  return (
    <div className="explorar-container">
      {/* CONTENIDO PRINCIPAL */}
      <div className="explorar-main">
        <div className="explorar-content">
          {/* TÍTULO Y FILTROS */}
          <div className="explorar-section-header">
            <h2 className="explorar-title">Servicios de Barbería Cercanos</h2>
            
            <div className="explorar-filters">
              <button 
                className={`explorar-filter-btn ${filtroServicio === '' ? 'active' : ''}`}
                onClick={() => setFiltroServicio('')}
              >
                Todos
              </button>
              <button 
                className={`explorar-filter-btn ${filtroServicio === 'corte' ? 'active' : ''}`}
                onClick={() => setFiltroServicio('corte')}
              >
                Corte clásico
              </button>
              <button 
                className={`explorar-filter-btn ${filtroServicio === 'fade' ? 'active' : ''}`}
                onClick={() => setFiltroServicio('fade')}
              >
                Fade / Degradado
              </button>
              <button 
                className={`explorar-filter-btn ${filtroServicio === 'perfilado' ? 'active' : ''}`}
                onClick={() => setFiltroServicio('perfilado')}
              >
                Perfilado
              </button>
            </div>

            <div className="explorar-radius-control">
              <label className="explorar-radius-label">Radio de búsqueda: {radio}km</label>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={radio} 
                onChange={(e) => setRadio(Number(e.target.value))}
                className="explorar-radius-slider"
              />
            </div>
          </div>

          {/* LISTADO DE BARBERÍAS */}
          <div className="explorar-barberias-list">
            {barberiasFiltradas.length === 0 && (
              <div className="explorar-empty">
                <p>No hay barberías cercanas</p>
              </div>
            )}

            {barberiasFiltradas.map((b) => {
              const slots = generarSlots(b).slice(0, 8);
              const unavailableSlots = ['10:00', '11:30', '14:00']; // Simulación de horarios no disponibles

              return (
                <div key={b.id} className="explorar-barberia-card">
                  <div className="explorar-barberia-icon">💈</div>
                  
                  <div className="explorar-barberia-info">
                    <h3 className="explorar-barberia-name">{b.nombre}</h3>
                    
                    <div className="explorar-barberia-rating">
                      <div className="explorar-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="explorar-star"
                            style={{ fill: i < Math.floor(b.rating) ? '#FFD700' : 'none', stroke: '#FFD700' }}
                          />
                        ))}
                      </div>
                      <span className="explorar-rating-value">{b.rating}</span>
                      <span className="explorar-opiniones">({b.totalOpiniones} opiniones)</span>
                    </div>

                    <p className="explorar-barberia-address">
                      <MapPin className="explorar-address-icon" />
                      {b.direccion}
                    </p>

                    <p className="explorar-barberia-distance">
                      A {b.dist} km de tu posición
                    </p>

                    <p className="explorar-barberia-price">
                      Servicio desde ${b.precioEstimado} pesos
                    </p>

                    <div className="explorar-slots-section">
                      <p className="explorar-slots-title">Horarios disponibles hoy:</p>
                      <div className="explorar-slots">
                        {slots.map((hora) => (
                          <button
                            key={hora}
                            onClick={() => {
                              if (user) {
                                navigate(`/barberia/${b.id}?hora=${hora}`);
                              } else {
                                navigate('/login', { state: { from: `/barberia/${b.id}?hora=${hora}` } });
                              }
                            }}
                            className={`explorar-slot ${unavailableSlots.includes(hora) ? 'unavailable' : ''}`}
                            disabled={unavailableSlots.includes(hora)}
                          >
                            {hora}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => navigate(`/barberia/${b.id}`)}
                      className="explorar-profile-link"
                    >
                      Ver perfil de barbería &gt;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MAPA */}
        <div className="explorar-map-container">
          <div className="explorar-map-placeholder">
            <p className="explorar-map-title">Mapa de Google Maps</p>
            <p className="explorar-map-subtitle">Zona de Puebla, México</p>
            <p className="explorar-map-note">Próximamente: Integración con Google Maps API</p>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect, useMemo } from 'react';
import { MapPin, Star } from 'lucide-react';
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
  const [radio, setRadio] = useState(15); // Controla el radio y altera el mapa
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
              setUbicacion([19.0433, -98.2019]); // Puebla por defecto
            }
          } catch {
            setUbicacion([19.0433, -98.2019]);
          }
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    } else {
      setTimeout(() => {
        setUbicacion([19.0433, -98.2019]);
      }, 0);
    }
  }, []);

  // ── 2. FILTRADO DINÁMICO (RADIO Y SERVICIOS) ───────────────────────────────
  const barberiasFiltradas = useMemo(() => {
    if (!ubicacion) return [];
    const [lat, lon] = ubicacion;

    return BARBERIAS
      .filter((b) => b.abierto)
      .map((b) => ({
        ...b,
        dist: calcularDistancia(lat, lon, b.lat, b.lng),
      }))
      /* Filtra interactivamente basándose en los km del slider */
      .filter((b) => b.dist <= radio)
      /* Filtra por los servicios más solicitados seleccionados */
      .filter((b) => {
        if (!filtroServicio) return true;
        const serviciosBH = b.servicios?.map(s => s.toLowerCase()) || [];
        return serviciosBH.includes(filtroServicio.toLowerCase()) || b.categoria?.toLowerCase() === filtroServicio.toLowerCase();
      })
      .sort((a, b) => a.dist - b.dist);
  }, [ubicacion, radio, filtroServicio]);

  // ── 3. MAPEO DINÁMICO DE ZOOM SEGÚN EL RADIO SELECCIONADO ──────────────────
  const mapaUrl = useMemo(() => {
    if (!ubicacion) return '';
    const [lat, lon] = ubicacion;
    
    // Calcula un nivel de zoom coherente para Google Maps basado en los kilómetros
    let zoom; 
    if (radio <= 2) zoom = 15;
    else if (radio <= 5) zoom = 14;
    else if (radio <= 15) zoom = 12;
    else if (radio <= 30) zoom = 11;
    else zoom = 10;

    // Genera la URL embebida apuntando a las coordenadas del usuario y variando el zoom
    return `https://maps.google.com/maps?q=${lat},${lon}&z=${zoom}&output=embed`;
  }, [ubicacion, radio]);

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
      <div className="explorar-main">
        
        {/* CONTENIDO PRINCIPAL IZQUIERDO */}
        <div className="explorar-content">
          
          {/* BANNER DE FILTROS INTEGRADOS */}
          <div className="explorar-section-header">
            <div className="explorar-header-left">
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
            </div>

            {/* CONTROL DEL RADIO REALMENTE FUNCIONAL */}
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

          {/* LISTADO DE TARJETAS */}
          <div className="explorar-barberias-list">
            {barberiasFiltradas.length === 0 && (
              <div className="explorar-empty">
                <p>No hay barberías que cumplan con los filtros en este rango de {radio}km.</p>
              </div>
            )}

            {barberiasFiltradas.map((b) => {
              const slots = generarSlots(b).slice(0, 6);
              const unavailableSlots = ['10:00', '11:30', '16:00']; 

              return (
                <div key={b.id} className="explorar-barberia-card">
                  
                  {/* MITAD IZQUIERDA: INFO GENERAL */}
                  <div className="explorar-barberia-left-block">
                    <div className="explorar-barberia-icon">💈</div>
                    <div className="explorar-barberia-info">
                      <h3 className="explorar-barberia-name">{b.nombre}</h3>
                      
                      <div className="explorar-barberia-rating">
                        <div className="explorar-stars">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="explorar-star"
                              style={{ fill: i < Math.floor(b.rating) ? '#E9C46A' : 'none', stroke: '#E9C46A' }}
                            />
                          ))}
                        </div>
                        <span className="explorar-opiniones">{b.rating} ({b.totalOpiniones || 14} opiniones)</span>
                      </div>

                      <p className="explorar-barberia-address">
                        <MapPin className="explorar-address-icon" />
                        {b.direccion}
                      </p>

                      <div className="explorar-barberia-distance">
                        A {b.dist} km de ti
                      </div>

                      <p className="explorar-barberia-price">
                        Servicio desde ${b.precioEstimado || 150} pesos
                      </p>
                    </div>
                  </div>

                  {/* MITAD DERECHA: HORARIOS Y ENLACE */}
                  <div className="explorar-barberia-right-block">
                    <div className="explorar-slots-section">
                      <p className="explorar-slots-title">Horarios disponibles hoy:</p>
                      <div className="explorar-slots">
                        {slots.map((hora) => {
                          const estaOcupado = unavailableSlots.includes(hora);
                          return (
                            <button
                              key={hora}
                              onClick={() => {
                                if (user) {
                                  navigate(`/barberia/${b.id}?hora=${hora}`);
                                } else {
                                  navigate('/login', { state: { from: `/barberia/${b.id}?hora=${hora}` } });
                                }
                              }}
                              className={`explorar-slot ${estaOcupado ? 'unavailable' : ''}`}
                              disabled={estaOcupado}
                            >
                              {hora}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <button 
                      onClick={() => navigate(`/barberia/${b.id}`)}
                      className="explorar-profile-link"
                    >
                      Ver perfil de barbería 
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* MAPA DINÁMICO VINCULADO AL SLIDER Y COORDENADAS */}
        <div className="explorar-map-container">
          <iframe
            title="Mapa BarberHub Dinámico"
            className="explorar-map-iframe"
            src={mapaUrl}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </div>
  );
}
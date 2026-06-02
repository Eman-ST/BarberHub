import React, { useState, useEffect } from 'react';
import { MapPin, Star, ChevronRight, Search, Clock, Map as MapIcon } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup, Circle, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

import AppNavbar from "../components/app-navbar";
import "../styles/explorar.css";

const calcularDistancia = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  return parseFloat((R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))).toFixed(1));
};

function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView(coords, 13);
  }, [coords, map]);
  return null;
}

export default function Explorar() {
  const navigate = useNavigate();
  const [ubicacion, setUbicacion] = useState(null);
  const [radio, setRadio] = useState(15);
  const [modalReserva, setModalReserva] = useState(null);
  const [barberias, setBarberias] = useState([]);
  const [cargandoBarberias, setCargandoBarberias] = useState(false);
  
  // Nuevos estados para los filtros
  const [filtroZona, setFiltroZona] = useState('');
  const [filtroHora, setFiltroHora] = useState('');
  const [servicioActivo, setServicioActivo] = useState('Todos');

  const todosLosHorarios = ['10:00 AM', '11:30 AM', '01:00 PM', '04:00 PM', '05:30 PM', '07:00 PM'];

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
      setUbicacion([19.043, -98.201]);
    }
  }, []);

  // ── 2. BÚSQUEDA EN OPENSTREETMAP ───────────────────────────────────────────
  useEffect(() => {
    if (!ubicacion) return;

    const buscarBarberias = async () => {
      setCargandoBarberias(true);
      const radioMetros = radio * 1000;
      const [lat, lon] = ubicacion;

      const query = `
        [out:json][timeout:25];
        (
          node["shop"="hairdresser"](around:${radioMetros},${lat},${lon});
          node["shop"="barber"](around:${radioMetros},${lat},${lon});
          way["shop"="hairdresser"](around:${radioMetros},${lat},${lon});
          way["shop"="barber"](around:${radioMetros},${lat},${lon});
        );
        out center;
      `;

      try {
        const res = await fetch('https://overpass-api.de/api/interpreter', {
          method: 'POST',
          body: query,
        });
        const data = await res.json();

        const resultados = data.elements
          .filter(el => el.lat || el.center)
          .map((el) => {
            const elLat = el.lat ?? el.center.lat;
            const elLon = el.lon ?? el.center.lon;
            return {
              id: el.id,
              name: el.tags?.name || 'Barbería sin nombre',
              lat: elLat,
              lng: elLon,
              address: el.tags?.['addr:street']
                ? `${el.tags['addr:street']}${el.tags['addr:housenumber'] ? ' ' + el.tags['addr:housenumber'] : ''}`
                : el.tags?.['addr:full'] || 'Dirección no disponible',
              phone: el.tags?.phone || el.tags?.['contact:phone'] || null,
              website: el.tags?.website || el.tags?.['contact:website'] || null,
              opening_hours: el.tags?.opening_hours || null,
              dist: calcularDistancia(lat, lon, elLat, elLon),
            };
          })
          .sort((a, b) => a.dist - b.dist);

        setBarberias(resultados);
      } catch (err) {
        console.error('Error al consultar Overpass:', err);
        setBarberias([]);
      } finally {
        setCargandoBarberias(false);
      }
    };

    buscarBarberias();
  }, [ubicacion, radio]);

  // ── 3. LÓGICA DE FILTRADO (ZONA Y HORA) ────────────────────────────────────
  const barberiasFiltradas = barberias.filter(b => {
    // Filtro por zona (busca coincidencias en el nombre o la dirección)
    const coincideZona = filtroZona === '' || 
      b.name.toLowerCase().includes(filtroZona.toLowerCase()) || 
      b.address.toLowerCase().includes(filtroZona.toLowerCase());
    
    return coincideZona;
  });

  // ── 4. FUNCIONES DE INTERACCIÓN ────────────────────────────────────────────
  const confirmarReserva = () => {
    alert(`¡Éxito! Tu cita en ${modalReserva.barberia.name} a las ${modalReserva.hora} ha sido enviada.`);
    setModalReserva(null);
  };

  const irADetalles = (barberia) => {
    navigate(`/barberia/${barberia.id}`);
  };

  // ── PANTALLA DE CARGA ──────────────────────────────────────────────────────
  if (!ubicacion) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fcf8f3' }}>
        <AppNavbar />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '16px', color: '#b8836f' }}>
          <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid #b8836f', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
          <p style={{ fontWeight: 'bold' }}>Ubicándote en el mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fcf8f3', minHeight: '100vh', paddingBottom: '40px', fontFamily: 'sans-serif' }}>
      <AppNavbar />
      
      <div style={{ maxWidth: '1280px', margin: '24px auto 0 auto', padding: '0 16px' }}>
        
        {/* CABECERA DE FILTROS MEJORADA */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e6c7a8', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '16px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#171717', margin: 0, fontFamily: 'serif' }}>Explorar Barberías</h2>
            
            {/* Etiquetas de Servicio */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Todos', 'Corte Clásico', 'Fade / Degradado', 'Ritual de Barba', 'Tinte'].map(tag => (
                <button 
                  key={tag} 
                  onClick={() => setServicioActivo(tag)}
                  style={{ 
                    backgroundColor: servicioActivo === tag ? '#000' : '#fcf8f3', 
                    color: servicioActivo === tag ? '#e8c46a' : '#000', 
                    fontWeight: 'bold', padding: '8px 16px', borderRadius: '9999px', fontSize: '12px', 
                    border: servicioActivo === tag ? '1px solid #000' : '1px solid #e6c7a8', cursor: 'pointer', transition: 'all 0.2s' 
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', backgroundColor: '#f9f5f0', padding: '16px', borderRadius: '16px', border: '1px solid #e6c7a8' }}>
            
            {/* Filtro: Zona (Búsqueda) */}
            <div style={{ flex: '1 1 250px', display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: '12px', padding: '8px 16px', border: '1px solid #e5e7eb' }}>
              <Search style={{ width: '18px', height: '18px', color: '#9ca3af', marginRight: '8px' }} />
              <input 
                type="text" 
                placeholder="Buscar por zona, nombre o calle..." 
                value={filtroZona}
                onChange={(e) => setFiltroZona(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', backgroundColor: 'transparent' }}
              />
            </div>

            {/* Filtro: Hora */}
            <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: '12px', padding: '8px 16px', border: '1px solid #e5e7eb' }}>
              <Clock style={{ width: '18px', height: '18px', color: '#9ca3af', marginRight: '8px' }} />
              <select 
                value={filtroHora} 
                onChange={(e) => setFiltroHora(e.target.value)}
                style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', backgroundColor: 'transparent', cursor: 'pointer', color: filtroHora ? '#000' : '#6b7280' }}
              >
                <option value="">Cualquier horario</option>
                {todosLosHorarios.map(hora => (
                  <option key={hora} value={hora}>{hora}</option>
                ))}
              </select>
            </div>

            {/* Filtro: Distancia (Radio) */}
            <div style={{ flex: '1 1 250px', display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: '12px', padding: '8px 16px', border: '1px solid #e5e7eb', gap: '12px' }}>
              <MapIcon style={{ width: '18px', height: '18px', color: '#9ca3af' }} />
              <input type="range" min="1" max="50" value={radio} onChange={(e) => setRadio(Number(e.target.value))} style={{ width: '100%', accentColor: '#000' }}/>
              <span style={{ backgroundColor: '#000', color: '#e8c46a', fontSize: '12px', fontWeight: 'bold', padding: '4px 10px', borderRadius: '8px', whiteSpace: 'nowrap' }}>{radio} km</span>
            </div>

          </div>
        </div>

        {/* LISTA + MAPA */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>

          {/* COLUMNA IZQUIERDA: LISTA */}
          <div style={{ flex: '2 1 55%', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {cargandoBarberias && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '40px', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e6c7a8', color: '#b8836f' }}>
                <div className="animate-spin" style={{ width: '24px', height: '24px', border: '4px solid #b8836f', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
                <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Buscando barberías cerca de ti…</span>
              </div>
            )}

            {!cargandoBarberias && barberiasFiltradas.length === 0 && (
              <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '24px', border: '1px dashed #e6c7a8' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>🧐</div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#171717', marginBottom: '8px' }}>No hay resultados</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', maxWidth: '300px', margin: '0 auto' }}>
                  No encontramos barberías que coincidan con tus filtros. Intenta ampliar el rango o cambiar la zona.
                </p>
              </div>
            )}

            {!cargandoBarberias && barberiasFiltradas.map(b => {
              // Filtrar los horarios visibles en la tarjeta según la hora seleccionada
              const horariosAMostrar = filtroHora ? [filtroHora] : todosLosHorarios;

              return (
                <div key={b.id} style={{ backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e6c7a8', display: 'flex', flexWrap: 'wrap', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', transition: 'transform 0.2s' }}>
                  
                  {/* Info */}
                  <div style={{ padding: '24px', flex: '1 1 50%', minWidth: '250px', borderRight: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <div style={{ width: '60px', height: '60px', backgroundColor: '#171717', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>💈</div>
                        <div style={{ flex: 1 }}>
                          <h3 onClick={() => irADetalles(b)} style={{ fontFamily: 'serif', fontWeight: '900', fontSize: '18px', color: '#000', margin: 0, cursor: 'pointer' }}>
                            {b.name}
                          </h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
                            <div style={{ display: 'flex', color: '#e8c46a', gap: '2px' }}>
                              {[...Array(5)].map((_, i) => <Star key={i} style={{ width: '14px', height: '14px', fill: 'currentColor' }}/>)}
                            </div>
                            <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '4px' }}>5.0</span>
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#f9f5f0', padding: '12px', borderRadius: '12px' }}>
                        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0, display: 'flex', alignItems: 'flex-start', gap: '6px', lineHeight: '1.4' }}>
                          <MapPin style={{ width: '14px', height: '14px', color: '#b8836f', flexShrink: 0, marginTop: '2px' }}/> {b.address}
                        </p>
                        {b.phone && <p style={{ fontSize: '13px', color: '#4b5563', margin: 0, display: 'flex', gap: '6px' }}>📞 {b.phone}</p>}
                      </div>
                    </div>
                    
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#b8836f', backgroundColor: 'rgba(184, 131, 111, 0.1)', padding: '4px 10px', borderRadius: '6px', margin: 0 }}>
                        📍 A {b.dist} km de ti
                      </p>
                      <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 'bold' }}>OPENSTREETMAP</span>
                    </div>
                  </div>

                  {/* Horarios */}
                  <div style={{ padding: '24px', flex: '1 1 40%', minWidth: '240px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: '900', color: '#171717', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock style={{ width: '14px', height: '14px', color: '#e8c46a' }}/> Turnos Disponibles
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: horariosAMostrar.length === 1 ? '1fr' : 'repeat(3, 1fr)', gap: '8px' }}>
                        {horariosAMostrar.map(hora => (
                          <button key={hora} onClick={() => setModalReserva({ barberia: b, hora })} style={{ backgroundColor: '#f9f5f0', color: '#171717', fontWeight: 'bold', fontSize: '12px', padding: '10px 4px', borderRadius: '10px', border: '1px solid #e6c7a8', cursor: 'pointer', transition: 'all 0.2s', width: '100%' }}>
                            {hora}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button onClick={() => irADetalles(b)} style={{ width: '100%', textAlign: 'center', fontSize: '13px', fontWeight: 'bold', color: '#171717', marginTop: '20px', padding: '12px', border: '1px solid #171717', borderRadius: '12px', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', transition: 'all 0.2s' }}>
                      Ver perfil completo <ChevronRight style={{ width: '16px', height: '16px' }}/>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* COLUMNA DERECHA: MAPA */}
          <div style={{ flex: '1 1 38%', minWidth: '320px', height: '600px', borderRadius: '24px', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', backgroundColor: '#fcf8f3', position: 'sticky', top: '24px' }}>
            <MapContainer center={ubicacion} zoom={13} style={{ height: "100%", width: "100%", zIndex: 1 }}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"/>
              <RecenterMap coords={ubicacion}/>
              <Circle center={ubicacion} radius={radio * 1000} pathOptions={{ color: '#b8836f', fillColor: '#b8836f', fillOpacity: 0.08, weight: 1.5 }}/>

              <CircleMarker center={ubicacion} radius={8} pathOptions={{ color: 'white', weight: 2, fillColor: '#000000', fillOpacity: 1 }}>
                <Popup>📍 Estás aquí</Popup>
              </CircleMarker>

              {barberiasFiltradas.map(b => (
                <CircleMarker key={b.id} center={[b.lat, b.lng]} radius={10} pathOptions={{ color: '#fff', weight: 2, fillColor: '#b8836f', fillOpacity: 0.9 }}>
                  <Popup>
                    <div style={{ textAlign: 'center', padding: '4px' }} onClick={() => irADetalles(b)}>
                      <strong style={{ fontSize: '14px', fontFamily: 'serif' }}>{b.name}</strong><br/>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>A {b.dist} km</span><br/>
                      <button style={{ backgroundColor: '#000', color: '#e8c46a', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', marginTop: '8px', cursor: 'pointer', width: '100%' }}>
                        Ver perfil
                      </button>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>

      {/* MODAL RESERVA */}
      {modalReserva && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '24px', maxWidth: '400px', width: '100%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', borderTop: '8px solid #000' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', backgroundColor: '#fcf8f3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                <Clock style={{ width: '24px', height: '24px', color: '#b8836f' }}/>
              </div>
              <h2 style={{ fontSize: '24px', fontFamily: 'serif', fontWeight: 'bold', color: '#171717', margin: 0 }}>Confirmar Reserva</h2>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>Estás a un paso de agendar tu cita.</p>
            </div>
            
            <div style={{ backgroundColor: '#f9f5f0', borderRadius: '16px', padding: '20px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid #e6c7a8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e6c7a8', paddingBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase' }}>Barbería</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#000', textAlign: 'right', maxWidth: '60%' }}>{modalReserva.barberia.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase' }}>Horario</span>
                <span style={{ fontSize: '16px', fontWeight: '900', color: '#b8836f', backgroundColor: '#fff', padding: '4px 12px', borderRadius: '8px', border: '1px solid #e6c7a8' }}>{modalReserva.hora}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setModalReserva(null)} style={{ flex: 1, backgroundColor: '#fff', color: '#4b5563', padding: '14px 0', borderRadius: '12px', fontWeight: 'bold', border: '1px solid #e5e7eb', cursor: 'pointer', transition: 'all 0.2s' }}>Cancelar</button>
              <button onClick={confirmarReserva} style={{ flex: 1, backgroundColor: '#000', color: '#e8c46a', padding: '14px 0', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
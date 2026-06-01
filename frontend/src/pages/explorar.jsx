import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IconMapPin, IconStarFilled, IconSearch } from "@tabler/icons-react";
import AppNavbar from "../components/app-navbar";
import { BARBERIAS } from "../data/barberias";
import "../styles/explorar.css";

/**
 * Contenedor reservado para Google Maps JavaScript API.
 * Al integrar Maps:
 * 1. Crea un ref: const mapRef = useRef(null)
 * 2. Asigna id="barberhub-map" al div .expl-map-canvas
 * 3. Inicializa el mapa con new google.maps.Map(mapRef.current, { center, zoom })
 * 4. Por cada barbería en BARBERIAS (o resultados Places), añade un Marker
 * 5. Al hacer clic en marcador o tarjeta, navigate(`/barberia/${id}`)
 */
export default function Explorar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();

  const resultados = useMemo(() => {
    if (!query) return BARBERIAS;
    return BARBERIAS.filter(
      (b) =>
        b.nombre.toLowerCase().includes(query) ||
        b.direccion.toLowerCase().includes(query) ||
        b.servicios.some((s) => s.nombre.toLowerCase().includes(query)),
    );
  }, [query]);

  return (
    <div className="expl-page">
      <AppNavbar />

      <div className="expl-layout">
        {/* Mapa — placeholder hasta Google Maps API */}
        <section className="expl-map-section" aria-label="Mapa de barberías">
          <div id="barberhub-map" className="expl-map-canvas">
            <div className="expl-map-placeholder">
              <IconMapPin size={48} stroke={1.2} color="#c9a227" />
              <p className="expl-map-title">Mapa interactivo</p>
              <p className="expl-map-hint">
                Aquí se cargará Google Maps. Las barberías cercanas
                aparecerán como marcadores según tu ubicación.
              </p>
              <p className="expl-map-note">
                Mientras tanto, selecciona una barbería de la lista →
              </p>
            </div>
          </div>
        </section>

        {/* Lista lateral */}
        <aside className="expl-sidebar">
          <div className="expl-sidebar-head">
            <h1>Barberías cerca de ti</h1>
            {query && (
              <p className="expl-query">
                <IconSearch size={14} />
                Resultados para &quot;{searchParams.get("q")}&quot;
              </p>
            )}
            <p className="expl-count">
              {resultados.length} {resultados.length === 1 ? "resultado" : "resultados"}
            </p>
          </div>

          <ul className="expl-list">
            {resultados.length === 0 ? (
              <li className="expl-empty">
                No encontramos barberías con ese criterio. Prueba otra búsqueda.
              </li>
            ) : (
              resultados.map((b) => (
                <li key={b.id}>
                  <button
                    type="button"
                    className="expl-card"
                    onClick={() => navigate(`/barberia/${b.id}`)}
                  >
                    <img
                      className="expl-card-img"
                      src={b.imagen}
                      alt=""
                    />
                    <div className="expl-card-body">
                      <span className="expl-card-name">{b.nombre}</span>
                      <span className="expl-card-rating">
                        <IconStarFilled size={14} />
                        {b.rating.toFixed(1)} ({b.totalOpiniones})
                      </span>
                      <span className="expl-card-address">
                        <IconMapPin size={13} />
                        {b.direccion}
                      </span>
                      <span
                        className={`expl-card-status ${b.abierto ? "expl-card-status--open" : ""}`}
                      >
                        {b.abierto ? "Abierto ahora" : "Cerrado"}
                      </span>
                    </div>
                  </button>
                </li>
              ))
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CalendarDays, Map, Menu, X, LogOut, User, History, Heart, Bell, Settings, Search } from "lucide-react";
import { getStoredUser, clearSession } from "../utils/api";
import brandLogo from "/barberhublogo.jpg";
import "../styles/sidebar-layout.css";

const NAV_ITEMS = [
  { href: "/explorar", label: "Explorar", icon: Map },
  { href: "/mis-citas", label: "Mis Citas", icon: CalendarDays },
  { href: "/historial", label: "Historial", icon: History },
  { href: "/favoritos", label: "Favoritos", icon: Heart },
  { href: "/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/ajustes", label: "Ajustes", icon: Settings },
];

export default function SidebarLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getStoredUser();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };

  const initials = user
    ? `${(user.nombre?.[0] ?? "").toUpperCase()}${(user.apellido?.[0] ?? "").toUpperCase()}`
    : "?";

  const isActive = (href) => location.pathname === href;

  return (
    <div className="sidebar-layout">
      {/* Toggle button for mobile */}
      <button
        className="sidebar-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src={brandLogo} alt="BarberHub" className="sidebar-logo-img" />
          <span className="sidebar-brand">BarberHub</span>
        </div>

        {user && (
          <div className="sidebar-user-info">
            <div className="sidebar-avatar">{initials}</div>
            <div>
              <div className="sidebar-user-name">
                {user.nombre} {user.apellido}
              </div>
              <div className="sidebar-user-email">{user.email}</div>
            </div>
          </div>
        )}

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                className={`sidebar-link ${isActive(item.href) ? "active" : ""}`}
                onClick={() => {
                  navigate(item.href);
                  setOpen(false);
                }}
              >
                <Icon className="sidebar-link-icon" />
                {item.label}
              </button>
            );
          })}

          {user && (
            <button
              className={`sidebar-link ${isActive("/perfil") ? "active" : ""}`}
              onClick={() => {
                navigate("/perfil");
                setOpen(false);
              }}
            >
              <User className="sidebar-link-icon" />
              Mi Perfil
            </button>
          )}
        </nav>

        <div className="sidebar-spacer" />

        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={handleLogout}>
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="sidebar-main-wrapper">
        {/* Global Header Limpio (Sin texto duplicado) */}
        <header className="sidebar-global-header">
          <div className="sidebar-header-left-space">
            {/* Espacio intencional para empujar el input a la derecha */}
          </div>
          
          <div className="sidebar-header-search">
            <input
              type="text"
              placeholder="Buscar barberías"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="sidebar-search-input"
            />
            <Search className="sidebar-search-icon" />
          </div>
        </header>

        {/* Page content */}
        <main className="sidebar-content">{children}</main>
      </div>
    </div>
  );
}
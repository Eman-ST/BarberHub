import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: conectar con el backend Node.js
    // const res = await fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });
    setTimeout(() => {
      setLoading(false);
      // navigate("/explorar");
    }, 1000);
  };

  return (
    <div className="login-wrapper">

      {/* ── COLUMNA IZQUIERDA — imagen + overlay ── */}
      <div className="login-left">
        <div className="login-overlay" />
        <div className="login-left-content">

          {/* Logo */}
          <div className="login-logo">
            <img src="/barberhublogo.jpg" alt="Barber Hub" />
          </div>

          {/* Texto hero */}
          <div className="login-hero-text">
            <h2>
              Encuentra tu barbería ideal{" "}
              <span className="login-accent">en segundos</span>
            </h2>
            <p>
              Reserva citas, conviértete en cliente VIP y
              descubre las mejores barberías cerca de ti.
            </p>
          </div>

          {/* Footer izquierdo */}
          <div className="login-left-footer">
            © 2026 Barber Hub · Todos los derechos reservados
          </div>
        </div>
      </div>

      {/* ── COLUMNA DERECHA — formulario ── */}
      <div className="login-right">
        <div className="login-form-wrap">
          <h1 className="login-title">¡Bienvenido!</h1>
          <p className="login-subtitle">Inicia sesión para continuar</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />

            <div className="login-forgot">
              <button
                type="button"
                className="login-link-gold"
                onClick={() => navigate("/recuperar-password")}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              className="login-btn-submit"
              type="submit"
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>

          <p className="login-register-row">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              className="login-link-gold"
              onClick={() => navigate("/registro")}
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>

    </div>
  );
}
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiFetch, saveSession } from "../utils/api";
import BrandLogo from "../components/brand-logo";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({
    email: state?.email ?? "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mensajeExito = state?.cuentaVerificada ? state.mensaje : null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      saveSession({ token: data.token, user: data.user });
      navigate("/explorar");
    } catch (err) {
      if (err.code === "EMAIL_NO_VERIFICADO") {
        navigate("/verificar-correo", { state: { email: form.email.trim() } });
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">

      {/* ── COLUMNA IZQUIERDA — imagen + overlay ── */}
      <div className="login-left">
        <div className="login-overlay" />
        <div className="login-left-content">

          <BrandLogo className="login-logo" imgClassName="login-logo-img" />

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

          {mensajeExito && (
            <p className="login-success" role="status">
              {mensajeExito}
            </p>
          )}

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

            {error && <p className="login-error">{error}</p>}

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
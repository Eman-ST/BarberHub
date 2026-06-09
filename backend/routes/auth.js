const express = require("express");
const users = require("../services/users");
const verification = require("../services/verification");
const passwordReset = require("../services/passwordReset");
const { validarPassword } = require("../utils/passwordPolicy");
const config = require("../config");
const { signToken } = require("../middleware/auth");

const router = express.Router();

function logCodigoDev(email, codigo, tipo) {
  if (process.env.NODE_ENV === "production") return;
  console.info(`[DEV] ${tipo} para ${email}: ${codigo}`);
}

router.post("/registro", async (req, res, next) => {
  try {
    const { nombre, apellido, email, telefono, password, confirmPassword } = req.body;

    if (!nombre?.trim() || !apellido?.trim() || !email?.trim() || !telefono?.trim()) {
      return res.status(400).json({ error: "Completa todos los campos." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Las contraseñas no coinciden." });
    }

    validarPassword(password);

    const user = await users.createUser({
      nombre,
      apellido,
      email,
      telefono,
      password,
    });

    const { codigo } = verification.crearCodigo(user.email);
    logCodigoDev(user.email, codigo, "Código de verificación");

    res.status(201).json({
      ok: true,
      email: user.email,
      mensaje: "Cuenta creada. Revisa tu correo para el código de verificación.",
    });
  } catch (err) {
    next(err);
  }
});

router.post("/enviar-codigo", (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email?.trim()) {
      return res.status(400).json({ error: "El correo es obligatorio." });
    }

    const user = users.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "No hay una cuenta con ese correo." });
    }

    if (user.emailVerificado) {
      return res.status(400).json({ error: "Este correo ya está verificado." });
    }

    const { codigo } = verification.crearCodigo(user.email);
    logCodigoDev(user.email, codigo, "Código de verificación");

    res.json({ ok: true, mensaje: "Código enviado." });
  } catch (err) {
    next(err);
  }
});

router.post("/reenviar-codigo", (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email?.trim()) {
      return res.status(400).json({ error: "El correo es obligatorio." });
    }

    const user = users.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "No hay una cuenta con ese correo." });
    }

    const { codigo } = verification.crearCodigo(user.email);
    logCodigoDev(user.email, codigo, "Nuevo código de verificación");

    res.json({ ok: true, mensaje: "Código reenviado." });
  } catch (err) {
    next(err);
  }
});

router.post("/verificar-codigo", (req, res, next) => {
  try {
    const { email, codigo } = req.body;
    if (!email?.trim() || !codigo) {
      return res.status(400).json({ error: "Correo y código son obligatorios." });
    }

    verification.verificarCodigo(email, codigo);
    const user = users.markEmailVerified(email);

    res.json({
      ok: true,
      mensaje: "Correo verificado. Ya puedes iniciar sesión.",
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password) {
      return res.status(400).json({ error: "Correo y contraseña son obligatorios." });
    }

    const user = await users.validateCredentials(email, password);
    const token = signToken(user);

    res.json({
      ok: true,
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/recuperar-password", (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email?.trim()) {
      return res.status(400).json({ error: "El correo es obligatorio." });
    }

    const user = users.findByEmail(email);
    if (user) {
      const { token } = passwordReset.crearToken(user.email);
      const enlace = `${config.frontendUrl}/restablecer-password?token=${token}`;

      if (process.env.NODE_ENV !== "production") {
        console.info(`[DEV] Enlace de recuperación para ${user.email}: ${enlace}`);
      }
      // TODO: SendGrid — enviar correo con enlace de restablecimiento
    }

    res.json({
      ok: true,
      mensaje: "Si el correo está registrado, recibirás instrucciones para restablecer tu contraseña.",
    });
  } catch (err) {
    next(err);
  }
});

router.get("/validar-reset-token", (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ error: "Token obligatorio." });
    }

    const datos = passwordReset.validarToken(token);
    res.json({ ok: true, email: datos.email });
  } catch (err) {
    next(err);
  }
});

router.post("/restablecer-password", async (req, res, next) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token obligatorio." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Las contraseñas no coinciden." });
    }

    validarPassword(password);

    const email = passwordReset.consumirToken(token);
    await users.updatePassword(email, password);

    res.json({
      ok: true,
      mensaje: "Tu contraseña se ha actualizado correctamente.",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

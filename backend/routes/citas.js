const express = require("express");
const citas = require("../services/citas");
const { optionalAuth, requireAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/", optionalAuth, (req, res, next) => {
  try {
    const cita = citas.crearCita({
      ...req.body,
      userId: req.user?.id ?? null,
    });

    res.status(201).json({ ok: true, cita });
  } catch (err) {
    next(err);
  }
});

router.get("/mias", requireAuth, (req, res, next) => {
  try {
    const lista = citas.listarPorUsuario(req.user.id);
    res.json({ ok: true, citas: lista });
  } catch (err) {
    next(err);
  }
});

router.get("/barberia/:barberiaId", (req, res, next) => {
  try {
    const lista = citas.listarPorBarberia(req.params.barberiaId);
    res.json({ ok: true, citas: lista });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", requireAuth, (req, res, next) => {
  try {
    const cita = citas.obtenerPorId(req.params.id);
    res.json({ ok: true, cita });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAuth, (req, res, next) => {
  try {
    const cita = citas.cancelarCita(req.params.id, req.user.id);
    res.json({ ok: true, cita });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const express = require("express");
const cors = require("cors");
const config = require("./config");
const authRoutes = require("./routes/auth");
const citasRoutes = require("./routes/citas");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ ok: true, mensaje: "BarberHub API funcionando" });
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, servicio: "barberhub-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/citas", citasRoutes);

app.use(errorHandler);

module.exports = app;

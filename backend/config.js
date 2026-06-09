require("dotenv").config();

module.exports = {
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET || "barberhub-dev-secret-cambiar-en-produccion",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  codigoExpiracionSeg: Number(process.env.CODIGO_EXPIRACION_SEG) || 195,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  resetTokenExpiracionSeg: Number(process.env.RESET_TOKEN_EXPIRACION_SEG) || 3600,
};

const { randomBytes } = require("crypto");
const { readCollection, writeCollection } = require("../store");
const config = require("../config");

const COLLECTION = "password-reset-tokens";

function listTokens() {
  return readCollection(COLLECTION, []);
}

function saveTokens(tokens) {
  writeCollection(COLLECTION, tokens);
}

function crearToken(email) {
  const normalized = email.trim().toLowerCase();
  const token = randomBytes(32).toString("hex");
  const expiraEn = Date.now() + config.resetTokenExpiracionSeg * 1000;

  const tokens = listTokens().filter((t) => t.email !== normalized);
  tokens.push({ token, email: normalized, expiraEn, creadoEn: Date.now() });
  saveTokens(tokens);

  return { token, expiraEn };
}

function consumirToken(token) {
  const entry = listTokens().find((t) => t.token === token);

  if (!entry) {
    const error = new Error("El enlace de recuperación no es válido o ya fue usado.");
    error.status = 400;
    throw error;
  }

  if (Date.now() > entry.expiraEn) {
    const tokens = listTokens().filter((t) => t.token !== token);
    saveTokens(tokens);
    const error = new Error("El enlace expiró. Solicita uno nuevo.");
    error.status = 400;
    throw error;
  }

  const tokens = listTokens().filter((t) => t.token !== token);
  saveTokens(tokens);

  return entry.email;
}

function validarToken(token) {
  const entry = listTokens().find((t) => t.token === token);

  if (!entry) {
    const error = new Error("El enlace de recuperación no es válido o ya fue usado.");
    error.status = 400;
    throw error;
  }

  if (Date.now() > entry.expiraEn) {
    const error = new Error("El enlace expiró. Solicita uno nuevo.");
    error.status = 400;
    throw error;
  }

  return { email: entry.email, expiraEn: entry.expiraEn };
}

module.exports = {
  crearToken,
  consumirToken,
  validarToken,
};

const { readCollection, writeCollection } = require("../store");
const config = require("../config");

const COLLECTION = "verification-codes";

function listCodes() {
  return readCollection(COLLECTION, []);
}

function saveCodes(codes) {
  writeCollection(COLLECTION, codes);
}

function generarCodigo() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function crearCodigo(email) {
  const normalized = email.trim().toLowerCase();
  const codigo = generarCodigo();
  const expiraEn = Date.now() + config.codigoExpiracionSeg * 1000;

  const codes = listCodes().filter((c) => c.email !== normalized);
  codes.push({ email: normalized, codigo, expiraEn, creadoEn: Date.now() });
  saveCodes(codes);

  return { codigo, expiraEn };
}

function verificarCodigo(email, codigoIngresado) {
  const normalized = email.trim().toLowerCase();
  const entry = listCodes().find((c) => c.email === normalized);

  if (!entry) {
    const error = new Error("No hay un código activo para este correo.");
    error.status = 400;
    throw error;
  }

  if (Date.now() > entry.expiraEn) {
    const error = new Error("El código expiró. Solicita uno nuevo.");
    error.status = 400;
    throw error;
  }

  if (entry.codigo !== String(codigoIngresado).trim()) {
    const error = new Error("Código incorrecto. Revisa tu correo e inténtalo de nuevo.");
    error.status = 400;
    throw error;
  }

  const codes = listCodes().filter((c) => c.email !== normalized);
  saveCodes(codes);

  return true;
}

module.exports = {
  crearCodigo,
  verificarCodigo,
};

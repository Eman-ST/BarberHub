const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");
const { readCollection, writeCollection } = require("../store");

const COLLECTION = "users";

function listUsers() {
  return readCollection(COLLECTION, []);
}

function saveUsers(users) {
  writeCollection(COLLECTION, users);
}

function findByEmail(email) {
  const normalized = email.trim().toLowerCase();
  return listUsers().find((u) => u.email === normalized) ?? null;
}

function findById(id) {
  return listUsers().find((u) => u.id === id) ?? null;
}

async function createUser({ nombre, apellido, email, telefono, password }) {
  const normalized = email.trim().toLowerCase();

  if (findByEmail(normalized)) {
    const error = new Error("Ya existe una cuenta con ese correo.");
    error.status = 409;
    throw error;
  }

  const user = {
    id: randomUUID(),
    nombre: nombre.trim(),
    apellido: apellido.trim(),
    email: normalized,
    telefono: telefono.trim(),
    passwordHash: await bcrypt.hash(password, 10),
    emailVerificado: false,
    creadoEn: new Date().toISOString(),
  };

  const users = listUsers();
  users.push(user);
  saveUsers(users);

  return sanitizeUser(user);
}

function markEmailVerified(email) {
  const users = listUsers();
  const index = users.findIndex((u) => u.email === email.trim().toLowerCase());
  if (index === -1) {
    const error = new Error("Usuario no encontrado.");
    error.status = 404;
    throw error;
  }

  users[index].emailVerificado = true;
  saveUsers(users);
  return sanitizeUser(users[index]);
}

async function validateCredentials(email, password) {
  const user = findByEmail(email);
  if (!user) {
    const error = new Error("Correo o contraseña incorrectos.");
    error.status = 401;
    throw error;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    const error = new Error("Correo o contraseña incorrectos.");
    error.status = 401;
    throw error;
  }

  if (!user.emailVerificado) {
    const error = new Error("Debes verificar tu correo antes de iniciar sesión.");
    error.status = 403;
    error.code = "EMAIL_NO_VERIFICADO";
    throw error;
  }

  return sanitizeUser(user);
}

async function updatePassword(email, password) {
  const normalized = email.trim().toLowerCase();
  const users = listUsers();
  const index = users.findIndex((u) => u.email === normalized);

  if (index === -1) {
    const error = new Error("Usuario no encontrado.");
    error.status = 404;
    throw error;
  }

  users[index].passwordHash = await bcrypt.hash(password, 10);
  saveUsers(users);
  return sanitizeUser(users[index]);
}

function sanitizeUser(user) {
  return {
    id: user.id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    telefono: user.telefono,
    emailVerificado: user.emailVerificado,
  };
}

module.exports = {
  findByEmail,
  findById,
  createUser,
  markEmailVerified,
  validateCredentials,
  updatePassword,
  sanitizeUser,
};

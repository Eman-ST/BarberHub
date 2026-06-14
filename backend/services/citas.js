const { randomUUID } = require("crypto");
const { readCollection, writeCollection } = require("../store");

const COLLECTION = "citas";

function listCitas() {
  return readCollection(COLLECTION, []);
}

function saveCitas(citas) {
  writeCollection(COLLECTION, citas);
}

function findConflicto({ barberiaId, fecha, hora }) {
  return listCitas().find(
    (c) =>
      c.barberiaId === barberiaId &&
      c.fecha === fecha &&
      c.hora === hora &&
      c.estado !== "cancelada",
  );
}

function crearCita(payload) {
  const {
    barberiaId,
    establecimiento,
    servicio,
    precio,
    moneda,
    fecha,
    hora,
    nombre,
    telefono,
    userId = null,
  } = payload;

  if (!barberiaId || !establecimiento || !servicio || !fecha || !hora || !nombre || !telefono) {
    const error = new Error("Faltan datos obligatorios para la reserva.");
    error.status = 400;
    throw error;
  }

  if (findConflicto({ barberiaId, fecha, hora })) {
    const error = new Error("Ese horario ya no está disponible. Elige otro.");
    error.status = 409;
    throw error;
  }

  const cita = {
    id: randomUUID(),
    barberiaId,
    establecimiento: establecimiento.trim(),
    servicio: servicio.trim(),
    precio: Number(precio),
    moneda: moneda || "MXN",
    fecha,
    hora,
    nombre: nombre.trim(),
    telefono: telefono.trim(),
    userId,
    estado: "confirmada",
    creadaEn: new Date().toISOString(),
  };

  const citas = listCitas();
  citas.push(cita);
  saveCitas(citas);

  return cita;
}

function listarPorUsuario(userId) {
  return listCitas()
    .filter((c) => c.userId === userId && c.estado !== "cancelada")
    .sort((a, b) => `${b.fecha} ${b.hora}`.localeCompare(`${a.fecha} ${a.hora}`));
}

function listarPorBarberia(barberiaId) {
  return listCitas().filter(
    (c) => c.barberiaId === barberiaId && c.estado !== "cancelada",
  );
}

function cancelarCita(citaId, userId) {
  const citas = listCitas();
  const citaIndex = citas.findIndex((c) => c.id === citaId && c.userId === userId);
  
  if (citaIndex === -1) {
    const error = new Error("Cita no encontrada o no pertenece al usuario");
    error.status = 404;
    throw error;
  }
  
  citas[citaIndex].estado = "cancelada";
  citas[citaIndex].canceladaEn = new Date().toISOString();
  saveCitas(citas);
  
  return citas[citaIndex];
}

function obtenerPorId(citaId) {
  const cita = listCitas().find((c) => c.id === citaId);
  if (!cita) {
    const error = new Error("Cita no encontrada");
    error.status = 404;
    throw error;
  }
  return cita;
}

module.exports = {
  crearCita,
  listarPorUsuario,
  listarPorBarberia,
  findConflicto,
  cancelarCita,
  obtenerPorId,
};

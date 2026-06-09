function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  const body = {
    error: err.message || "Error interno del servidor.",
  };

  if (err.code) {
    body.code = err.code;
  }

  if (process.env.NODE_ENV !== "production" && status === 500) {
    console.error(err);
  }

  res.status(status).json(body);
}

module.exports = errorHandler;

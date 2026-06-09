const SYMBOL_REGEX = /[^A-Za-z0-9]/;

function evaluarPassword(password) {
  const valor = String(password ?? "");
  const checks = {
    length: valor.length >= 8,
    lower: /[a-z]/.test(valor),
    upper: /[A-Z]/.test(valor),
    number: /\d/.test(valor),
    symbol: SYMBOL_REGEX.test(valor),
  };

  const puntaje = Object.values(checks).filter(Boolean).length;

  let nivel = "debil";
  if (checks.length && checks.lower && checks.number && checks.symbol) {
    nivel = checks.upper ? "fuerte" : "media";
  }

  const valida =
    checks.length && checks.lower && checks.number && checks.symbol;

  return { nivel, checks, valida, puntaje };
}

function validarPassword(password) {
  const resultado = evaluarPassword(password);

  if (!resultado.valida) {
    const error = new Error(
      "La contraseña debe tener al menos 8 caracteres, una letra, un número y un símbolo.",
    );
    error.status = 400;
    throw error;
  }

  return resultado;
}

module.exports = {
  evaluarPassword,
  validarPassword,
};

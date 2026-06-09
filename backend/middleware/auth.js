const jwt = require("jsonwebtoken");
const config = require("../config");
const users = require("../services/users");

function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn },
  );
}

function optionalAuth(req, _res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  try {
    const payload = jwt.verify(header.slice(7), config.jwtSecret);
    const user = users.findById(payload.sub);
    req.user = user ? users.sanitizeUser(user) : null;
  } catch {
    req.user = null;
  }

  next();
}

function requireAuth(req, res, next) {
  optionalAuth(req, res, () => {
    if (!req.user) {
      return res.status(401).json({ error: "Debes iniciar sesión." });
    }
    next();
  });
}

module.exports = {
  signToken,
  optionalAuth,
  requireAuth,
};

const jwt = require("jsonwebtoken");

// Requires a valid Bearer token. Use on routes that must be logged in.
function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Attaches req.userId if a valid token is present, but doesn't block the
// request if it's missing. Use on routes like checkout/reviews that work
// for guests too but can link to a user when logged in.
function optionalAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = payload.id;
    } catch (err) {
      // ignore invalid token, just treat as guest
    }
  }
  next();
}

module.exports = { requireAuth, optionalAuth };

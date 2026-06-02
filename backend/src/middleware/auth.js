const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'change_this_secret_for_production';

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }

    req.user = {
      id: decoded.userId,
      email: decoded.email
    };

    next();
  });
}

module.exports = authenticateToken;

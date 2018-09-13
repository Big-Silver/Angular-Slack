import jwt from 'jsonwebtoken';
import config from '../core/config/config.dev';

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false, message: 'Failed to authenticate token.',
      });
    }

    req.user = decoded;
    next();
  });
};

export default authMiddleware;

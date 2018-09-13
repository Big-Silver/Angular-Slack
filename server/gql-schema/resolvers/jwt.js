import jwt from 'jsonwebtoken';
import config from '../../core/config/config.dev';

export const verifyToken = (token) => {
  if (!token) {
    return Promise.reject(new Error('Please provide token'));
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(new Error('Invalid token'));
      }

      resolve(decoded);
    });
  });
};

export const getToken = user =>
  jwt.sign(user.toObject(), config.JWT_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });

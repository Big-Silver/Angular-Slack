
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import User from '../models/user';

import logger from '../core/logger/app-logger';
import config from '../core/config/config.dev';

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().max(255).min(8),
  wsSlug: Joi.string().max(255).required(),
});

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().max(255).min(8),
  name: Joi.string().max(255).required(),
  wsSlug: Joi.string().max(255).required(),
  wsName: Joi.string().max(255),
});

function getToken(user) {
  return jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
}

const controller = {};

controller.login = async (req, res, next) => {
  try {
    const data = await Joi.validate(req.body, loginSchema);

    const user = await User.findOne({ email: data.email });

    user.comparePassword(data.password, (err, rst) => {
      if (err) next(err);

      if (rst) {
        const token = getToken(user);

        res.send({ user, token });
      } else {
        res.status(401).send('Invalid email or password');
      }
    });
  } catch (err) {
    logger.error('Error logging in user');
    if (err.isJoi) {
      res.status(500).send(err.details[0].message);
    } else {
      res.status(500).send('Server side error');
    }
  }
};

controller.register = async (req, res) => {
  try {
    const data = await Joi.validate(req.body, userSchema);

    const user = new User(data);
    await user.save();

    res.send({
      user: user.toObject(),
      token: getToken(user),
    });
  } catch (err) {
    logger.error('Error registering user');
    if (err.isJoi) {
      res.status(500).send(err.details[0].message);
    } else if (err.code === 11000) {
      res.status(500).send('User is already registered.');
    } else {
      res.status(500).send('Server side error');
    }
  }
};

export default controller;

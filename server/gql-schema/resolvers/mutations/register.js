import Joi from 'joi';
import User from '../../../models/user';
import { getToken } from '../jwt';

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().max(255).min(8),
  username: Joi.string().max(255).required(),
});

const register = async (_, args) => {
  try {
    const data = await Joi.validate(args, userSchema);

    const user = new User(data);
    await user.save();

    return {
      user,
      token: getToken(user),
    };
  } catch (err) {
    throw err;
  }
};

export default register;

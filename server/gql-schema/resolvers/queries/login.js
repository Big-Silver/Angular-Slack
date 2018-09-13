import User from '../../../models/user';
import { getToken } from '../jwt';

const login = async (_, { email, password }) => {
  try {
    const user = await User.findOne({ email });
    const isMatch = await user.comparePasswordPromise(password);

    if (isMatch) {
      return {
        user,
        token: getToken(user),
      };
    }

    throw new Error('Invalid email or password');
  } catch (err) {
    return err;
  }
};

export default login;

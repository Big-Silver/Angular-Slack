import Message from '../../../models/message';
import { verifyToken } from '../jwt';

const messages = async (_, { token, from }) => {
  try {
    await verifyToken(token);

    let where = {};
    const date = parseInt(from, 10);

    if (date && !Number.isNaN(date)) {
      where = { time: { $gte: date } };
    }

    return Message.find(where);
  } catch (err) {
    throw err;
  }
};

export default messages;

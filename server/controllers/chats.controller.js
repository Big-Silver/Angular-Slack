import Message from '../models/message';
import logger from '../core/logger/app-logger';

const controller = {};

controller.getLast7Days = async (req, res) => {
  try {
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    const messages = await Message.find({
      time: { $gt: date.getTime() },
    }).populate('userId');

    const data = messages.map(msg => ({
      ...msg.toObject(),
      name: msg.name,
    }));

    res.send(data);
  } catch (err) {
    logger.error(`Error in getting chats- ${err}`);
    res.status(500).send('Got error in getAll');
  }
};

controller.send = async (req, res) => {
  try {
    const msg = new Message({
      user: req.user._id,
      name: req.user.username,
      time: new Date().getTime(),
      text: req.body.data,
    });
    msg.save();

    const msgData = {
      msg: {
        ...msg.toObject(),
        name: req.user.username,
      },
    };

    res.send(msgData);
  } catch (err) {
    logger.error(`Error in getting chats- ${err}`);
    res.status(500).send('Got error in getAll');
  }
};

export default controller;

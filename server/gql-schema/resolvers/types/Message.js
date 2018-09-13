import User from '../../../models/user';

const Message = {
  user(msg) {
    return User.findById(msg.user);
  },
};

export default Message;

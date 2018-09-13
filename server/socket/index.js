import SocketIO from 'socket.io';
import jwt from 'jsonwebtoken';
import config from '../core/config/config.dev';
import User from '../models/user';
import configureChannels from './channels';

const sockets = {};

const initSocketIO = (server) => {
  const io = new SocketIO(server);

  io.on('connection', (socket) => {
    const { token } = socket.handshake.query;

    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('Unauthorized user');
        socket.disconnect();
        return;
      }

      const userId = decoded.id;

      if (sockets[userId]) {
        sockets[userId].disconnect();
      }

      sockets[userId] = socket;

      User.findById(userId, (err1, user) => {
        if (err1) {
          console.log('Connection error');
          socket.disconnect();
          return;
        }

        configureChannels(socket, user);
      });
    });
  });
};

export default initSocketIO;

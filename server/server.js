import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import logger from './core/logger/app-logger';
import config from './core/config/config.dev';
import auth from './routes/auth.route';
import chats from './routes/chats.route';
import gql from './routes/gql.route';
import connectToDb from './db/connect';
import initSocketIO from './socket';

const port = config.serverPort;
logger.stream = {
  write: (message) => {
    logger.info(message);
  },
};

connectToDb();

const app = express();
const server = http.Server(app);
initSocketIO(server);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev', { stream: logger.stream }));

app.use('/auth', auth);
app.use('/chats', chats);
app.use('/', gql);

// Index route
app.get('/', (req, res) => {
  res.send('Node API');
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status || 500).send(err);
  } else {
    next();
  }
});

server.listen(port, () => {
  logger.info('server started - ', port);
});

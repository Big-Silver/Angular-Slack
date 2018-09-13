import Mongoose from 'mongoose';
import logger from '../core/logger/app-logger';
import config from '../core/config/config.dev';

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
  const {
    dbHost,
    dbPort,
    dbName,
    dbUser,
    dbPassword,
  } = config;

  try {
    if (dbHost === 'localhost') {
      await Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
    } else {
      await Mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`);
    }
    logger.info('Connected to mongo!!!');
  } catch (err) {
    logger.error('Could not connect to MongoDB');
  }
};

export default connectToDb;

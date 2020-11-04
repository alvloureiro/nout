import { app } from './app';
import { database } from './services/database';
import { DatabaseConnectionError } from '@alotech/common';

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('The system did not export MONGO_URI');
  }
  const db = await database.connect(process.env.MONGO_URI);
  if (!db) {
    throw new DatabaseConnectionError();
  }

  app.listen(4000, () => {
    console.log('App running on port 4000');
  });
};

start();

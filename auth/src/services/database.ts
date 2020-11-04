import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { Db } from 'mongodb';
import { DatabaseConnectionError } from '@alotech/common';

interface Seed {
  path: string;
}
class DatabaseService {
  private db: Db | undefined;
  async connect(uri: string): Promise<Db> {
    const connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    this.db = connection.connection.db;
    return this.db;
  }

  async seedDb(seed: Seed) {
    if (!this.db) {
      throw new DatabaseConnectionError();
    }

    const seedPath = path.resolve(process.cwd(), seed.path);
    fs.readFile(seedPath, 'utf8', async (err, data) => {
      if (err) {
        console.error('Could not access the file seed: ', err);
        throw new Error(err.message);
      }

      const dataContent = JSON.parse(data);
      const { collection, values } = dataContent;

      const length = await this.db?.collection(collection).countDocuments();
      if (length === 0) {
        await this.db?.collection(collection).insertMany(values);
      }
    });
  }
}

const instance = new DatabaseService();

export { instance as database, Seed };

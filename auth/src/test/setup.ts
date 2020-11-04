import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: any;

beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUrii = await mongo.getUri();
  await mongoose.connect(mongoUrii, { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

import debug from 'debug';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

const log = debug('pulse:mock-mongodb');

export interface IMockMongo {
  disconnect: () => Promise<void>;
  mongo: MongoClient;
  mongod: MongoMemoryServer;
  uri: string;
}

export async function mockMongoDb(): Promise<IMockMongo> {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  log('mongod started', uri);

  const mongo = await MongoClient.connect(uri);

  const disconnect = async (): Promise<void> => {
    await Promise.all([mongod.stop().then(() => log('mongod stopped')), mongo.close()]);
  };

  const self: IMockMongo = {
    disconnect,
    mongo,
    mongod,
    uri,
  };

  return self;
}

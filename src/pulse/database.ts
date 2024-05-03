import createDebugger from 'debug';
import { AnyError, Collection, MongoClient, MongoClientOptions } from 'mongodb';
import { Pulse } from '.';
import { BaseError } from '../utils';
import { hasMongoProtocol } from './has-mongo-protocol';

const debug = createDebugger('pulse:database');

export type DatabaseMethod = (
  this: Pulse,
  url: string,
  collection?: string,
  options?: MongoClientOptions,
  cb?: (error: AnyError | undefined, collection: Collection<any> | null) => void
) => Promise<Pulse | void>;

/**
 * Connect to the spec'd MongoDB server and database.
 *
 * NOTE:
 * If `url` includes auth details then `options` must specify: { 'uri_decode_auth': true }. This does Auth on
 * the specified database, not the Admin database. If you are using Auth on the Admin DB and not on the Pulse DB,
 * then you need to authenticate against the Admin DB and then pass the MongoDB instance into the constructor
 * or use Pulse.mongo(). If your app already has a MongoDB connection then use that. ie. specify config.mongo in
 * the constructor or use Pulse.mongo().
 * @name Pulse#database
 * @function
 * @param url MongoDB server URI
 * @param [collection] name of collection to use. Defaults to `pulseJobs`
 * @param [options] options for connecting
 * @param [cb] callback of MongoDB connection
 */
export const database: DatabaseMethod = async function (this: Pulse, url, collection?, options = {}, cb?) {
  if (!hasMongoProtocol(url)) {
    url = 'mongodb://' + url;
  }

  collection = collection || 'pulseJobs';

  const client = await MongoClient.connect(url, options).catch((error) => {
    debug('error connecting to MongoDB using collection: [%s]', collection);
    if (cb) {
      cb(error, null);
    } else {
      throw error;
    }
  });

  if (!client) {
    throw new BaseError('Mongo Client is undefined');
  }

  this._db = client;
  this._mdb = client.db();
  this.dbInit(collection, cb);
  return this;
};

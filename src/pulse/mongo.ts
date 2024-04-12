import { AnyError, Collection, Db } from 'mongodb';
import { Pulse } from '.';

export type MongoMethod = (
  mdb: Db,
  collection?: string,
  cb?: (error: AnyError | undefined, collection: Collection<any> | null) => void
) => Pulse;
/**
 * Build method used to add MongoDB connection details
 * @name Pulse#mongo
 * @function
 * @param mdb instance of MongoClient to use
 * @param [collection] name collection we want to use ('pulseJobs')
 * @param [cb] called when MongoDB connection fails or passes
 */
export const mongo: MongoMethod = function (this: Pulse, mdb, collection?, cb?) {
  this._mdb = mdb;
  this.dbInit(collection, cb);
  return this;
};

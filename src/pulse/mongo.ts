import { AnyError, Collection, Db } from 'mongodb';
import { Pulse } from '.';

/**
 * Build method used to add MongoDB connection details
 * @name Pulse#mongo
 * @function
 * @param mdb instance of MongoClient to use
 * @param [collection] name collection we want to use ('pulseJobs')
 * @param [cb] called when MongoDB connection fails or passes
 */
export const mongo = function (
  this: Pulse,
  mdb: Db,
  collection?: string,
  cb?: (error: AnyError | undefined, collection: Collection<any> | null) => void
): Pulse {
  this._mdb = mdb;
  this.db_init(collection, cb);
  return this;
};

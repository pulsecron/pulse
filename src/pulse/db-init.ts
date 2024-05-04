import createDebugger from 'debug';
import { AnyError, Collection } from 'mongodb';
import { Pulse } from '.';

const debug = createDebugger('pulse:db_init');

export type DbInitMethod = (
  collection?: string,
  cb?: (error: AnyError | undefined, collection: Collection<any> | null) => void
) => void;

/**
 * Setup and initialize the collection used to manage Jobs.
 * @name Pulse#dbInit
 * @function
 * @param collection name or undefined for default 'pulseJobs'
 * @param [cb] called when the db is initialized
 */
export const dbInit: DbInitMethod = function (this: Pulse, collection = 'pulseJobs', cb?) {
  debug('init database collection using name [%s]', collection);
  this._collection = this._mdb.collection(collection);

  if (this._resumeOnRestart) {
    this.resumeOnRestart(this._resumeOnRestart);
  }

  if (this._disableAutoIndex) {
    debug('skipping auto index creation');
    this.emit('ready');
    return;
  }

  debug('attempting index creation');
  this._collection
    .createIndex(this._indices, { name: 'findAndLockNextJobIndex' })
    .then(() => {
      debug('index creation success');
      this.emit('ready');
    })
    .catch((error) => {
      debug('index creation failed');
      this.emit('error', error);
      if (cb) {
        cb(error, this._collection);
      }
    });
};

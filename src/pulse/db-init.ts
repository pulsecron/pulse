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
    const now = new Date();
    this._collection
      .updateMany(
        {
          $or: [
            { lockedAt: { $exists: true }, lastFinishedAt: { $exists: false } },
            {
              $and: [
                { lockedAt: { $exists: false } },
                { lastFinishedAt: { $exists: false } },
                { nextRunAt: { $lte: now } },
              ],
            },
          ],
        },
        {
          $unset: { lockedAt: undefined, lastModifiedBy: undefined, lastRunAt: undefined },
          $set: { nextRunAt: now },
        }
      )
      .then((result) => {
        if (result.modifiedCount > 0) {
          debug('resuming unfinished %d jobs(%s)', result.modifiedCount, now.toISOString());
          console.log('resuming unfinished %d jobs(%s)', result.modifiedCount, now.toISOString());
        }
      });
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

import createDebugger from 'debug';
import { Pulse } from '.';

const debug = createDebugger('pulse:resumeOnRestart');

export type ResumeOnRestartMethod = (resume?: boolean) => Pulse;

/**
 * Set the resume on restart flag
 * @name Pulse#resumeOnRestart
 * @function
 * @param resume resume on restart
 */
export const resumeOnRestart: ResumeOnRestartMethod = function (this: Pulse, resume = true) {
  debug('Pulse.resumeOnRestart()');

  this._resumeOnRestart = resume;

  if (this._collection && this._resumeOnRestart) {
    const now = new Date();
    this._collection
      .updateMany(
        {
          $or: [
            {
              lockedAt: { $exists: true },
              $expr: { $eq: ['$runCount', '$finishedCount'] },
            },
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
        }
      });
  }

  return this;
};

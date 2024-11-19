import createDebugger from 'debug';
import { Pulse } from '.';
import { Job } from '../job';

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

    // Non-recurring jobs
    this._collection
      .updateMany(
        {
          $or: [
            {
              lockedAt: { $exists: true },
              nextRunAt: { $ne: null },
              $or: [
                { $expr: { $eq: ['$runCount', '$finishedCount'] } },
                { $or: [{ lastFinishedAt: { $exists: false } }, { lastFinishedAt: null }] },
              ],
            },
            {
              lockedAt: { $exists: false },
              $or: [{ lastFinishedAt: { $exists: false } }, { lastFinishedAt: null }],
              nextRunAt: { $lte: now, $ne: null },
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
          debug('Resumed %d unfinished standard jobs (%s)', result.modifiedCount, now.toISOString());
        }
      });

    // Handling for recurring jobs using repeatInterval or repeatAt
    this._collection
      .find({
        $and: [
          { $or: [{ repeatInterval: { $exists: true } }, { repeatAt: { $exists: true } }] },
          { $or: [{ nextRunAt: { $lte: now } }, { nextRunAt: { $exists: false } }, { nextRunAt: null }] },
        ],
      })
      .toArray()
      .then((jobs) => {
        const updates = jobs.map((jobData) => {
          const job = new Job({
            pulse: this,
            name: jobData.name || '',
            data: jobData.data || {},
            type: jobData.type || 'normal',
            priority: jobData.priority || 'normal',
            shouldSaveResult: jobData.shouldSaveResult || false,
            attempts: jobData.attempts || 0,
            backoff: jobData.backoff,
            ...jobData,
          });

          job.computeNextRunAt();

          return this._collection.updateOne(
            { _id: job.attrs._id },
            {
              $set: { nextRunAt: job.attrs.nextRunAt },
              $unset: { lockedAt: undefined, lastModifiedBy: undefined, lastRunAt: undefined },
            }
          );
        });

        return Promise.all(updates);
      })
      .then((results) => {
        const modifiedCount = results.filter((res) => res.modifiedCount > 0).length;
        if (modifiedCount > 0) {
          debug('Resumed %d recurring jobs (%s)', modifiedCount, now.toISOString());
        }
      });
  }

  return this;
};

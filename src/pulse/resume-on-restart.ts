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
          $and: [
            { repeatInterval: { $exists: false } }, // Ensure the job is not recurring (no repeatInterval)
            { repeatAt: { $exists: false } }, // Ensure the job is not recurring (no repeatAt)
            {
              $or: [
                {
                  lockedAt: { $exists: true }, // Locked jobs (interrupted or in-progress)
                  $and: [
                    {
                      $or: [
                        { nextRunAt: { $lte: now, $ne: null } }, // Overdue jobs
                        { nextRunAt: { $exists: false } }, // Jobs missing nextRunAt
                        { nextRunAt: null }, // Jobs explicitly set to null
                      ],
                    },
                    {
                      $or: [
                        { $expr: { $eq: ['$runCount', '$finishedCount'] } }, // Jobs finished but stuck due to locking
                        { $or: [{ lastFinishedAt: { $exists: false } }, { lastFinishedAt: null }] }, // Jobs that were not finished
                      ],
                    },
                  ],
                },
                {
                  lockedAt: { $exists: false }, // Unlocked jobs (not in-progress)
                  $and: [
                    {
                      $or: [
                        { nextRunAt: { $lte: now, $ne: null } }, // Overdue jobs
                        { nextRunAt: { $exists: false } }, // Jobs missing nextRunAt
                        { nextRunAt: null }, // Jobs explicitly set to null
                      ],
                    },
                    { $or: [{ lastFinishedAt: { $exists: false } }, { lastFinishedAt: null }] }, // Jobs not finished
                  ],
                },
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
          debug('Resumed %d unfinished standard jobs (%s)', result.modifiedCount, now.toISOString());
        }
      });

    // Recurring jobs
    this._collection
      .find({
        $and: [
          { $or: [{ repeatInterval: { $exists: true } }, { repeatAt: { $exists: true } }] }, // Recurring jobs
          {
            $or: [
              { nextRunAt: { $lte: now } }, // Overdue jobs
              { nextRunAt: { $exists: false } }, // Jobs missing nextRunAt
              { nextRunAt: null }, // Jobs explicitly set to null
            ],
          },
          {
            $or: [
              { lastFinishedAt: { $exists: false } }, // Jobs never run
              { lastFinishedAt: { $lte: now } }, // Jobs finished in the past
              { lastFinishedAt: null }, // Jobs explicitly set to null
            ],
          },
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

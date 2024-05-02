import createDebugger from 'debug';
import { Pulse } from '.';

const debug = createDebugger('pulse:stop');

export type StopMethod = () => Promise<void>;
/**
 * Clear the interval that processes the jobs
 * @name Pulse#stop
 * @function
 * @returns resolves when job unlocking fails or passes
 */
export const stop: StopMethod = async function (this: Pulse) {
  /**
   * Internal method to unlock jobs so that they can be re-run
   * NOTE: May need to update what properties get set here, since job unlocking seems to fail
   * @access private
   * @returns resolves when job unlocking fails or passes
   */
  const _unlockJobs = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      debug('Pulse._unlockJobs()');
      const jobIds = this._lockedJobs.map((job) => job.attrs._id);

      if (jobIds.length === 0) {
        debug('no jobs to unlock');
        resolve();
      }

      debug('about to unlock jobs with ids: %O', jobIds);
      this._collection
        .updateMany({ _id: { $in: jobIds } }, { $set: { lockedAt: null } })
        .then(() => {
          this._lockedJobs = [];
          return resolve();
        })
        .catch((error) => {
          if (error) {
            return reject(error);
          }

          this._lockedJobs = [];
          return resolve();
        });
    });
  };

  debug('Pulse.stop called, clearing interval for processJobs()');
  clearInterval(this._processInterval);
  this._processInterval = undefined;
  return _unlockJobs();
};

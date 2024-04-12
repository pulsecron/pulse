import createDebugger from 'debug';
import { Pulse } from '.';

const debug = createDebugger('pulse:drain');

export type DrainMethod = () => Promise<void>;
/**
 * Clear the interval that processes the jobs
 * @name Pulse#drain
 * @function
 * @returns resolves when all running jobs completes
 */
export const drain: DrainMethod = async function (this: Pulse) {
  return new Promise((resolve) => {
    debug('Pulse.drain called, clearing interval for processJobs()');
    clearInterval(this._processInterval);
    this._processInterval = undefined;

    if (this._runningJobs.length === 0) {
      resolve();
    } else {
      debug('Pulse.drain waiting for jobs to finish');
      this.on('complete', () => {
        // running jobs are removed after the event
        if (this._runningJobs.length === 1) {
          resolve();
        }
      });
    }
  });
};

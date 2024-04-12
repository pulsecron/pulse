import { Job } from '.';

export type RepeatAtMethod = (time: string) => Job;
/**
 * Sets a job to repeat at a specific time
 * @name Job#repeatAt
 * @function
 * @param time time to repeat job at (human readable or number)
 */
export const repeatAt: RepeatAtMethod = function (this: Job, time) {
  this.attrs.repeatAt = time;
  return this;
};

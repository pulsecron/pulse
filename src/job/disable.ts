import { Job } from '.';

export type DisableMethod = () => Job;
/**
 * Prevents the job type from running
 * @name Job#disable
 * @function
 */
export const disable: DisableMethod = function (this: Job) {
  this.attrs.disabled = true;
  return this;
};

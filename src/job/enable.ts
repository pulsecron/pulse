import { Job } from '.';

export type EnableMethod = () => Job;
/**
 * Allows job type to run
 * @name Job#enable
 * @function
 */
export const enable: EnableMethod = function (this: Job) {
  this.attrs.disabled = false;
  return this;
};

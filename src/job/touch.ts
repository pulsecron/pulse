import { Job } from '.';

export type TouchMethod = () => Promise<Job>;
/**
 * Updates "lockedAt" time so the job does not get picked up again
 * @name Job#touch
 * @function
 */
export const touch: TouchMethod = async function (this: Job): Promise<Job> {
  this.attrs.lockedAt = new Date();
  return this.save();
};

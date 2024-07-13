import { Job } from '.';

export type TouchMethod = (progress?: number) => Promise<Job>;
/**
 * Updates "lockedAt" time so the job does not get picked up again
 * @name Job#touch
 * @function
 * @param progress 0 to 100
 */
export const touch: TouchMethod = async function (this: Job, progress?): Promise<Job> {
  this.attrs.lockedAt = new Date();
  this.attrs.progress = progress;
  return this.save();
};

import { Job } from '.';

export type SaveMethod = () => Promise<Job>;
/**
 * Saves a job into the MongoDB
 * @name Job#
 * @function
 * @returns instance of Job resolved after job is saved or errors
 */
export const save: SaveMethod = async function (this: Job) {
  return this.pulse.saveJob(this);
};

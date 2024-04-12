import { Job } from '.';

export type UniqueMethod = (unique: any, options?: { insertOnly: boolean }) => Job;
/**
 * Data to ensure is unique for job to be created
 * @name Job#unique
 * @function
 * @param unique mongo data query for unique
 * @param options unique options
 */
export const unique: UniqueMethod = function (this: Job, unique, options?) {
  this.attrs.unique = unique;
  this.attrs.uniqueOpts = options;
  return this;
};

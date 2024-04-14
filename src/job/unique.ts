import { Filter } from 'mongodb';
import { Job } from '.';

export type UniqueMethod<TSchema extends Document = Document> = (
  filter: Filter<TSchema>,
  options?: { insertOnly: boolean }
) => Job;
/**
 * Data to ensure is unique for job to be created
 * @name Job#unique
 * @function
 * @param filter mongo data query for unique
 * @param options unique options
 */
export const unique: UniqueMethod = function (this: Job, filter, options?) {
  this.attrs.uniqueQuery = filter;
  this.attrs.uniqueOpts = options;
  return this;
};

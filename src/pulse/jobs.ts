import { Filter, Sort } from 'mongodb';
import { Pulse } from '.';
import { Job } from '../job';
import { createJob } from '../utils';

export const getJobsRepo = async function (this: Pulse, query = {}, sort = {}, limit = 0, skip = 0) {
  return await this._collection.find(query).sort(sort).limit(limit).skip(skip).toArray();
};

export type JobsMethod = (query?: Filter<any>, sort?: Sort | string, limit?: number, skip?: number) => Promise<Job[]>;

/**
 * Finds all jobs matching 'query'
 * @name Pulse#jobs
 * @function
 * @param [query] object for MongoDB
 * @param [sort] object for MongoDB
 * @param [limit] number of documents to return from MongoDB
 * @param [number] of documents to skip in MongoDB
 * @returns resolves when fails or passes
 */
export const jobs: JobsMethod = async function (this: Pulse, query = {}, sort = {}, limit = 0, skip = 0) {
  const result = await getJobsRepo.call(this, query, sort, limit, skip);
  return result.map((job: any) => createJob(this, job));
};

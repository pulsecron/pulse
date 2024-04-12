import { Job } from '.';
import { parsePriority } from '../utils';

export type PriorityMethod = (priority: string) => Job;
/**
 * Sets priority of the job
 * @param priority priority of when job should be queued
 */
export const priority: PriorityMethod = function (this: Job, priority) {
  this.attrs.priority = parsePriority(priority);
  return this;
};

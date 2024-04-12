import { Job } from '.';

export type SetShouldSaveResultMethod = (shouldSaveResult: boolean) => Job;
/**
 * Sets the flag if the return value of the job should be persisted
 * @param shouldSaveResult flag if the return value of the job should be persisted
 */
export const setShouldSaveResult: SetShouldSaveResultMethod = function (this: Job, shouldSaveResult) {
  this.attrs.shouldSaveResult = shouldSaveResult;
  return this;
};

import { Job, JobAttributes } from '../job';
import { Pulse } from '../pulse';

/**
 * Create Job object from data
 * @param {Object} pulse instance of Pulse
 * @param {Object} jobData job data
 * @returns {Job} returns created job
 */
export const createJob = (pulse: Pulse, jobData: JobAttributes): Job => {
  jobData.pulse = pulse;
  return new Job(jobData);
};

import createDebugger from 'debug';
import { Pulse } from '.';
import { Job, JobAttributesData } from '../job';

const debug = createDebugger('pulse:now');

export type NowMethod = <T extends JobAttributesData>(name: string, data?: T) => Promise<Job>;
/**
 * Create a job for this exact moment
 * @name Pulse#now
 * @function
 * @param name name of job to schedule
 * @param data data to pass to job
 */
export const now: NowMethod = async function (this: Pulse, name, data) {
  debug('Pulse.now(%s, [Object])', name);
  try {
    const job = this.create(name, data || {});

    job.schedule(new Date());
    await job.save();

    return job;
  } catch (error) {
    debug('error trying to create a job for this exact moment');
    throw error;
  }
};

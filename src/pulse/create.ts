import createDebugger from 'debug';
import { Pulse } from '.';
import { Job, JobAttributesData } from '../job';

const debug = createDebugger('pulse:create');

export type CreateMethod = <T extends JobAttributesData>(name: string, data: T) => Job;
/**
 * Given a name and some data, create a new job
 * @name Pulse#create
 * @function
 * @param name name of job
 * @param data data to set for job
 */
export const create: CreateMethod = function (this: Pulse, name, data) {
  debug('Pulse.create(%s, [Object])', name);
  const priority = this._definitions[name] ? this._definitions[name].priority : 0;
  const shouldSaveResult = this._definitions[name] ? this._definitions[name].shouldSaveResult || false : false;
  const job = new Job({ name, data, type: 'normal', priority, shouldSaveResult, pulse: this });

  return job;
};

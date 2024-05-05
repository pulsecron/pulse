import createDebugger from 'debug';
import { Pulse } from '.';
import { Job, JobAttributesData } from '../job';

const debug = createDebugger('pulse:define');

export enum JobPriority {
  highest = 20,
  high = 10,
  normal = 0,
  low = -10,
  lowest = -20,
}

export interface DefineOptions {
  /**
   * Maximum number of that job that can be running at once (per instance of pulse)
   */
  concurrency?: number;

  /**
   * Maximum number of that job that can be locked at once (per instance of pulse)
   */
  lockLimit?: number;

  /**
   * Interval in ms of how long the job stays locked for (see multiple job processors for more info). A job will
   * automatically unlock if done() is called.
   */
  lockLifetime?: number;

  /**
   * (lowest|low|normal|high|highest|number) specifies the priority of the job. Higher priority jobs will run
   * first.
   */
  priority?: keyof typeof JobPriority;

  /**
   * Should the return value of the job be persisted
   */
  shouldSaveResult?: boolean;

  /**
   * Number of attempts to run the job
   * @default 0
   */
  attempts?: number;

  /**
   * Backoff options
   */
  backoff?: {
    /**
     * Type of backoff to use
     * @default exponential
     */
    type: 'exponential' | 'fixed';

    /**
     * Delay in ms
     * @default 1000
     * Math.pow(2, attempts - 1) * delay
     */
    delay: number;
  };
}

export type Processor<T extends JobAttributesData> = (
  job: Job<T>,
  done: (error?: Error, result?: unknown) => void
) => unknown | Promise<unknown>;

export type DefineMethod = <T extends JobAttributesData>(
  name: string,
  processor: Processor<T>,
  options?: DefineOptions
) => void;

/**
 * Setup definition for job
 * Method is used by consumers of lib to setup their functions
 * @name Pulse#define
 * @function
 * @param name name of job
 * @param [processor] function to be called to run actual job
 * @param options options for job to run
 */
export const define: DefineMethod = function (this: Pulse, name, processor, options?) {
  this._definitions[name] = {
    fn: processor,
    concurrency: (options as DefineOptions)?.concurrency || this._defaultConcurrency,
    lockLimit: (options as DefineOptions)?.lockLimit || this._defaultLockLimit,
    priority: (options as DefineOptions)?.priority || JobPriority.normal,
    lockLifetime: (options as DefineOptions)?.lockLifetime || this._defaultLockLifetime,
    running: 0,
    locked: 0,
    shouldSaveResult: (options as DefineOptions)?.shouldSaveResult || false,
    attempts: (options as DefineOptions)?.attempts || 0,
    backoff: (options as DefineOptions)?.attempts && {
      type: (options as DefineOptions)?.backoff?.type || 'exponential',
      delay: (options as DefineOptions)?.backoff?.delay || 1000,
    },
  };

  debug('job [%s] defined with following options: \n%O', name, this._definitions[name]);
};

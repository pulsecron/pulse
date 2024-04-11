import * as mongodb from 'mongodb';
import { Pulse } from '../pulse';
import { JobPriority } from '../pulse/define';
import { parsePriority } from '../utils';
import { computeNextRunAt } from './compute-next-run-at';
import { disable } from './disable';
import { enable } from './enable';
import { fail } from './fail';
import { isRunning } from './is-running';
import { priority } from './priority';
import { remove } from './remove';
import { repeatAt } from './repeat-at';
import { repeatEvery } from './repeat-every';
import { run } from './run';
import { save } from './save';
import { schedule } from './schedule';
import { setShouldSaveResult } from './set-shouldsaveresult';
import { toJson } from './to-json';
import { touch } from './touch';
import { unique } from './unique';

type Modify<T, R> = Omit<T, keyof R> & R;

export interface JobAttributesData {
  [key: string]: any;
}
export interface JobAttributes<T extends JobAttributesData = JobAttributesData> {
  /**
   * The record identity.
   */
  _id: mongodb.ObjectId;

  pulse: Pulse;

  /**
   * The type of the job (single|normal).
   */
  type: string;

  /**
   * The name of the job.
   */
  name: string;

  /**
   * Job's state
   */
  disabled?: boolean;

  /**
   * Date/time the job will run next.
   */
  nextRunAt?: Date | null;

  /**
   * Date/time the job was locked.
   */
  lockedAt?: Date | null;

  /**
   * The priority of the job.
   */
  priority: number | string;

  /**
   * The job details.
   */
  data: T | any;

  unique?: any;
  uniqueOpts?: {
    insertOnly: boolean;
  };

  /**
   * How often the job is repeated using a human-readable or cron format.
   */
  repeatInterval?: string;

  /**
   * The timezone that conforms to [moment-timezone](http://momentjs.com/timezone/).
   */
  repeatTimezone?: string | null;

  repeatAt?: string;

  /**
   * Date/time the job was last run.
   */
  lastRunAt?: Date;

  /**
   * Date/time the job last finished running.
   */
  lastFinishedAt?: Date;

  startDate?: Date | number | null;
  endDate?: Date | number | null;
  skipDays?: string | null;

  /**
   * The reason the job failed.
   */
  failReason?: string;

  /**
   * The number of times the job has failed.
   */
  failCount?: number;

  /**
   * The date/time the job last failed.
   */
  failedAt?: Date;

  /**
   * Date/time the job was last modified.
   */
  lastModifiedBy?: string;

  /**
   * Should the return value of the job be persisted.
   */
  shouldSaveResult?: boolean;

  /**
   * Result of the finished job.
   */
  result?: unknown;
}

/**
 * @class
 * @param {Object} args - Job Options
 * @property {Object} pulse - The Pulse instance
 * @property {Object} attrs
 */
class Job<T extends JobAttributesData = JobAttributesData> {
  /**
   * The pulse that created the job.
   */
  pulse: Pulse;

  /**
   * The database record associated with the job.
   */
  attrs: JobAttributes<T>;

  toJSON = toJson;
  computeNextRunAt = computeNextRunAt;
  repeatEvery = repeatEvery;
  repeatAt = repeatAt;
  disable = disable;
  enable = enable;
  unique = unique;
  schedule = schedule;
  priority = priority;
  fail = fail;
  run = run;
  isRunning = isRunning;
  save = save;
  remove = remove;
  touch = touch;
  setShouldSaveResult = setShouldSaveResult;

  constructor(options: Modify<JobAttributes<T>, { _id?: mongodb.ObjectId }>) {
    const { pulse, type, nextRunAt, ...args } = options ?? {};

    // Save Pulse instance
    this.pulse = pulse;

    // Set priority
    args.priority = args.priority === undefined ? JobPriority.normal : parsePriority(args.priority);

    // Set shouldSaveResult option
    args.shouldSaveResult = args.shouldSaveResult || false;

    // Set attrs to args
    const attrs: any = {};
    for (const key in args) {
      if ({}.hasOwnProperty.call(args, key)) {
        // @ts-expect-error
        attrs[key] = args[key];
      }
    }

    // Set defaults if undefined
    this.attrs = {
      ...attrs,
      // NOTE: What is the difference between 'once' here and 'single' in pulse/index.js?
      name: attrs.name || '',
      priority: attrs.priority,
      type: type || 'once',
      nextRunAt: nextRunAt || new Date(),
    };
  }
}

export { Job };

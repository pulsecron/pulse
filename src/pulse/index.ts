import { EventEmitter } from 'events';
import humanInterval from 'human-interval';
import { AnyError, Collection, MongoClient, MongoClientOptions, Db as MongoDb } from 'mongodb';
import { Job } from '../job';
import { CancelMethod, cancel } from './cancel';
import { CloseMethod, close } from './close';
import { CreateMethod, create } from './create';
import { DatabaseMethod, database } from './database';
import { DbInitMethod, dbInit } from './db-init';
import { DefaultConcurrencyMethod, defaultConcurrency } from './default-concurrency';
import { DefaultLockLifetimeMethod, defaultLockLifetime } from './default-lock-lifetime';
import { DefaultLockLimitMethod, defaultLockLimit } from './default-lock-limit';
import { DefineMethod, define } from './define';
import { DisableMethod, disable } from './disable';
import { DrainMethod, drain } from './drain';
import { EnableMethod, enable } from './enable';
import { EveryMethod, every } from './every';
import { findAndLockNextJob } from './find-and-lock-next-job';
import { JobProcessingQueue } from './job-processing-queue';
import { JobsMethod, jobs } from './jobs';
import { LockLimitMethod, lockLimit } from './lock-limit';
import { MaxConcurrencyMethod, maxConcurrency } from './max-concurrency';
import { MongoMethod, mongo } from './mongo';
import { NameMethod, name } from './name';
import { NowMethod, now } from './now';
import { ProcessEveryMethod, processEvery } from './process-every';
import { PurgeMethod, purge } from './purge';
import { SaveJobMethod, saveJob } from './save-job';
import { ScheduleMethod, schedule } from './schedule';
import { SortMethod, sort } from './sort';
import { StartMethod, start } from './start';
import { StopMethod, stop } from './stop';

export type PulseOnEventType = 'ready' | 'start' | 'success' | 'fail' | 'complete' | 'error';
export interface PulseConfig {
  name?: string;
  processEvery?: string;
  maxConcurrency?: number;
  defaultConcurrency?: number;
  lockLimit?: number;
  defaultLockLimit?: number;
  defaultLockLifetime?: number;
  sort?: any;
  mongo?: MongoDb;
  db?: {
    address: string;
    collection?: string;
    options?: MongoClientOptions;
  };
  disableAutoIndex?: boolean;
}

/**
 * @class Pulse
 * @param {Object} config - Pulse Config
 * @param {Function} cb - Callback after Pulse has started and connected to mongo
 * @property {Object} _name - Name of the current Pulse queue
 * @property {Number} _processEvery
 * @property {Number} _defaultConcurrency
 * @property {Number} _maxConcurrency
 * @property {Number} _defaultLockLimit
 * @property {Number} _lockLimit
 * @property {Object} _definitions
 * @property {Object} _runningJobs
 * @property {Object} _lockedJobs
 * @property {Object} _jobQueue
 * @property {Number} _defaultLockLifetime
 * @property {Object} _sort
 * @property {Object} _indices
 * @property {Boolean} _isLockingOnTheFly - true if 'lockingOnTheFly' is currently running. Prevent concurrent execution of this method.
 * @property {Map} _isJobQueueFilling - A map of jobQueues and if the 'jobQueueFilling' method is currently running for a given map. 'lockingOnTheFly' and 'jobQueueFilling' should not run concurrently for the same jobQueue. It can cause that lock limits aren't honored.
 * @property {Array} _jobsToLock
 */
class Pulse extends EventEmitter {
  private _lazyBindings: Record<string, any> = {};
  _defaultConcurrency: any;
  _defaultLockLifetime: any;
  _defaultLockLimit: any;
  _definitions: any;
  _findAndLockNextJob = findAndLockNextJob;
  _indices: any;
  _disableAutoIndex: boolean;
  _isLockingOnTheFly: boolean;
  _isJobQueueFilling: Map<string, boolean>;
  _jobQueue: JobProcessingQueue;
  _jobsToLock: Job[];
  _lockedJobs: Job[];
  _runningJobs: Job[];
  _lockLimit: any;
  _maxConcurrency: any;
  _mongoUseUnifiedTopology?: boolean;
  _name: any;
  _processEvery: number;
  _ready: Promise<unknown>;
  _sort: any;
  _db!: MongoClient;
  _mdb!: MongoDb;
  _collection!: Collection;
  _nextScanAt: any;
  _processInterval: any;

  /**
   * Constructs a new Pulse object.
   * @param config Optional configuration to initialize the Pulse.
   * @param cb Optional callback called with the MongoDB collection.
   */
  constructor(
    config: PulseConfig = {},
    cb?: (error: AnyError | undefined, collection: Collection<any> | null) => void
  ) {
    super();

    this._name = config.name;
    this._processEvery = (humanInterval(config.processEvery) ?? humanInterval('5 seconds')) as number; // eslint-disable-line @typescript-eslint/non-nullable-type-assertion-style
    this._defaultConcurrency = config.defaultConcurrency || 5;
    this._maxConcurrency = config.maxConcurrency || 20;
    this._defaultLockLimit = config.defaultLockLimit || 0;
    this._lockLimit = config.lockLimit || 0;
    this._definitions = {};
    this._runningJobs = [];
    this._lockedJobs = [];
    this._jobQueue = new JobProcessingQueue();
    this._defaultLockLifetime = config.defaultLockLifetime || 10 * 60 * 1000; // 10 minute default lockLifetime
    this._sort = config.sort || { nextRunAt: 1, priority: -1 };
    this._indices = {
      name: 1,
      ...this._sort,
      priority: -1,
      lockedAt: 1,
      nextRunAt: 1,
      disabled: 1,
    };
    this._disableAutoIndex = config.disableAutoIndex === true;

    this._isLockingOnTheFly = false;
    this._isJobQueueFilling = new Map<string, boolean>();
    this._jobsToLock = [];
    this._ready = new Promise((resolve) => {
      this.once('ready', resolve);
    });

    this.init(config, cb);
  }

  /**
   ***************************************
   * Public methods
   * *************************************
   */

  get define(): DefineMethod {
    return this.bindMethod('define', define);
  }

  get every(): EveryMethod {
    return this.bindMethod('every', every);
  }

  get processEvery(): ProcessEveryMethod {
    return this.bindMethod('processEvery', processEvery);
  }

  get cancel(): CancelMethod {
    return this.bindMethod('cancel', cancel);
  }

  get close(): CloseMethod {
    return this.bindMethod('close', close);
  }

  get create(): CreateMethod {
    return this.bindMethod('create', create);
  }

  get dbInit(): DbInitMethod {
    return this.bindMethod('dbInit', dbInit);
  }

  get defaultConcurrency(): DefaultConcurrencyMethod {
    return this.bindMethod('defaultConcurrency', defaultConcurrency);
  }

  get defaultLockLifetime(): DefaultLockLifetimeMethod {
    return this.bindMethod('defaultLockLifetime', defaultLockLifetime);
  }

  get defaultLockLimit(): DefaultLockLimitMethod {
    return this.bindMethod('defaultLockLimit', defaultLockLimit);
  }

  get disable(): DisableMethod {
    return this.bindMethod('disable', disable);
  }

  get enable(): EnableMethod {
    return this.bindMethod('enable', enable);
  }

  get jobs(): JobsMethod {
    return this.bindMethod('jobs', jobs);
  }

  get lockLimit(): LockLimitMethod {
    return this.bindMethod('lockLimit', lockLimit);
  }

  get maxConcurrency(): MaxConcurrencyMethod {
    return this.bindMethod('maxConcurrency', maxConcurrency);
  }

  get name(): NameMethod {
    return this.bindMethod('name', name);
  }

  get now(): NowMethod {
    return this.bindMethod('now', now);
  }

  get purge(): PurgeMethod {
    return this.bindMethod('purge', purge);
  }

  get saveJob(): SaveJobMethod {
    return this.bindMethod('saveJob', saveJob);
  }

  get schedule(): ScheduleMethod {
    return this.bindMethod('schedule', schedule);
  }

  get sort(): SortMethod {
    return this.bindMethod('sort', sort);
  }

  get start(): StartMethod {
    return this.bindMethod('start', start);
  }

  get stop(): StopMethod {
    return this.bindMethod('stop', stop);
  }

  get drain(): DrainMethod {
    return this.bindMethod('drain', drain);
  }

  get mongo(): MongoMethod {
    return this.bindMethod('mongo', mongo);
  }

  get database(): DatabaseMethod {
    return this.bindMethod('database', database);
  }

  /**
   *
   ***************************************
   * Overridden methods
   * *************************************
   */

  on(event: PulseOnEventType, listener: (...arg: any[]) => void): this {
    return super.on(event, listener);
  }

  /**
   ***************************************
   * Private methods
   * *************************************
   */

  private init(config: PulseConfig, cb?: (error: AnyError | undefined, collection: Collection<any> | null) => void) {
    if (config.mongo) {
      this.mongo(config.mongo, config.db ? config.db.collection : undefined, cb); // @ts-expect-error // the documentation shows it should be correct: http://mongodb.github.io/node-mongodb-native/3.6/api/Db.html
      if (config.mongo.s && config.mongo.topology && config.mongo.topology.s) {
        this._mongoUseUnifiedTopology = Boolean(
          // @ts-expect-error
          config.mongo.topology.s.options.useUnifiedTopology
        );
      }
    } else if (config.db) {
      this.database(config.db.address, config.db.collection, config.db.options, cb);
    }
  }

  private bindMethod<T extends Function>(methodName: string, fn: T): T {
    if (!this._lazyBindings[methodName]) {
      this._lazyBindings[methodName] = fn.bind(this);
    }
    return this._lazyBindings[methodName] as T;
  }
}

export { Pulse };

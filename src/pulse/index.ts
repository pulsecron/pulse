import { EventEmitter } from 'events';
import humanInterval from 'human-interval';
import { AnyError, Collection, MongoClient, MongoClientOptions, Db as MongoDb } from 'mongodb';
import { Job } from '../job';
import { cancel } from './cancel';
import { close } from './close';
import { create } from './create';
import { DatabaseMethod, database } from './database';
import { dbInit } from './db-init';
import { defaultConcurrency } from './default-concurrency';
import { defaultLockLifetime } from './default-lock-lifetime';
import { defaultLockLimit } from './default-lock-limit';
import { DefineMethod, define } from './define';
import { disable } from './disable';
import { drain } from './drain';
import { enable } from './enable';
import { EveryMethod, every } from './every';
import { findAndLockNextJob } from './find-and-lock-next-job';
import { JobProcessingQueue } from './job-processing-queue';
import { jobs } from './jobs';
import { lockLimit } from './lock-limit';
import { maxConcurrency } from './max-concurrency';
import { mongo } from './mongo';
import { name } from './name';
import { now } from './now';
import { processEvery } from './process-every';
import { purge } from './purge';
import { saveJob } from './save-job';
import { schedule } from './schedule';
import { sort } from './sort';
import { start } from './start';
import { stop } from './stop';

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

  processEvery = processEvery;
  cancel = cancel;
  close = close;
  create = create;
  db_init = dbInit;
  defaultConcurrency = defaultConcurrency;
  defaultLockLifetime = defaultLockLifetime;
  defaultLockLimit = defaultLockLimit;
  disable = disable;
  enable = enable;

  jobs = jobs;
  lockLimit = lockLimit;
  maxConcurrency = maxConcurrency;
  mongo = mongo;
  name = name;
  now = now;
  purge = purge;
  saveJob = saveJob;
  schedule = schedule;
  sort = sort;
  start = start;
  stop = stop;
  drain = drain;

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

  get database(): DatabaseMethod {
    return this.bindMethod('database', database);
  }

  get define(): DefineMethod {
    return this.bindMethod('define', define);
  }

  get every(): EveryMethod {
    return this.bindMethod('every', every);
  }

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

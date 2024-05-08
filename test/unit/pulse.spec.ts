/* eslint-disable no-console,no-unused-expressions,@typescript-eslint/no-unused-expressions */

import { Db } from 'mongodb';

import { Pulse } from '../../src';
import { Job } from '../../src/job';
import { hasMongoProtocol } from '../../src/pulse/has-mongo-protocol';
import { mockMongoDb } from '../helpers/mock.helper';

describe('Test Pulse', () => {
  const jobTimeout = 500;
  const jobProcessor = () => {};

  let globalPulseInstance: Pulse;
  let mongoDb: Db;
  let mongoDbConfig: string;
  let mongoDbDisconnect: () => Promise<void>;
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const clearJobs = async (): Promise<void> => {
    if (mongoDb) {
      await mongoDb.collection('pulseJobs').deleteMany({});
    }
  };

  beforeEach(async () => {
    const { mongo, uri, disconnect } = await mockMongoDb();
    mongoDb = mongo.db();
    mongoDbConfig = uri;
    mongoDbDisconnect = disconnect;
    globalPulseInstance = new Pulse({ mongo: mongoDb });
    delay(50);
    await clearJobs();
    ['someJob', 'send email', 'some job'].forEach((job) => {
      globalPulseInstance.define(job, jobProcessor);
    });
  });

  afterEach(async () => {
    await clearJobs();
    await globalPulseInstance.stop();
  });

  afterAll((done) => {
    delay(50);
    mongoDbDisconnect();
    done();
  });

  test('sets a default processEvery', () => {
    expect(globalPulseInstance._processEvery).toEqual(5000);
  });

  describe('Test configuration methods', () => {
    test('sets the _db directly when passed as an option', () => {
      const pulseDb = new Pulse({ mongo: mongoDb });
      expect(pulseDb._mdb).not.toBeUndefined();
    });
  });

  describe('Test configuration methods', () => {
    describe('Test mongo connection tester', () => {
      test('passing a valid server connection string', () => {
        expect(hasMongoProtocol(mongoDbConfig)).toEqual(true);
      });

      test('passing a valid multiple server connection string', () => {
        expect(hasMongoProtocol(`mongodb+srv://localhost/pulse-test`)).toEqual(true);
      });

      test('passing an invalid connection string', () => {
        expect(hasMongoProtocol(`localhost/pulse-test`)).toEqual(false);
      });
    });
    describe('Test mongo', () => {
      test('sets the _db directly', () => {
        const pulse = new Pulse();
        pulse.mongo(mongoDb);
        expect(pulse._mdb).not.toBeUndefined();
      });

      test('returns itself', async () => {
        const pulse = new Pulse();
        expect(await pulse.mongo(mongoDb)).toEqual(pulse);
      });
    });

    describe('Test name', () => {
      test('sets the pulse name', () => {
        globalPulseInstance.name('test queue');
        expect(globalPulseInstance._name).toEqual('test queue');
      });
      test('returns itself', () => {
        expect(globalPulseInstance.name('test queue')).toEqual(globalPulseInstance);
      });
    });
    describe('Test processEvery', () => {
      test('sets the processEvery time', () => {
        globalPulseInstance.processEvery('3 minutes');
        expect(globalPulseInstance._processEvery).toEqual(180000);
      });
      test('returns itself', () => {
        expect(globalPulseInstance.processEvery('3 minutes')).toEqual(globalPulseInstance);
      });
    });
    describe('Test maxConcurrency', () => {
      test('sets the maxConcurrency', () => {
        globalPulseInstance.maxConcurrency(10);
        expect(globalPulseInstance._maxConcurrency).toEqual(10);
      });
      test('returns itself', () => {
        expect(globalPulseInstance.maxConcurrency(10)).toEqual(globalPulseInstance);
      });
    });
    describe('Test defaultConcurrency', () => {
      test('sets the defaultConcurrency', () => {
        globalPulseInstance.defaultConcurrency(1);
        expect(globalPulseInstance._defaultConcurrency).toEqual(1);
      });
      test('returns itself', () => {
        expect(globalPulseInstance.defaultConcurrency(5)).toEqual(globalPulseInstance);
      });
    });
    describe('Test lockLimit', () => {
      test('sets the lockLimit', () => {
        globalPulseInstance.lockLimit(10);
        expect(globalPulseInstance._lockLimit).toEqual(10);
      });
      test('returns itself', () => {
        expect(globalPulseInstance.lockLimit(10)).toEqual(globalPulseInstance);
      });
    });
    describe('Test defaultLockLimit', () => {
      test('sets the defaultLockLimit', () => {
        globalPulseInstance.defaultLockLimit(1);
        expect(globalPulseInstance._defaultLockLimit).toEqual(1);
      });
      test('returns itself', () => {
        expect(globalPulseInstance.defaultLockLimit(5)).toEqual(globalPulseInstance);
      });
    });
    describe('Test defaultLockLifetime', () => {
      test('returns itself', () => {
        expect(globalPulseInstance.defaultLockLifetime(1000)).toEqual(globalPulseInstance);
      });
      test('sets the default lock lifetime', () => {
        globalPulseInstance.defaultLockLifetime(9999);
        expect(globalPulseInstance._defaultLockLifetime).toEqual(9999);
      });
      test('is inherited by jobs', () => {
        globalPulseInstance.defaultLockLifetime(7777);
        globalPulseInstance.define('testDefaultLockLifetime', () => {});
        expect(globalPulseInstance._definitions.testDefaultLockLifetime.lockLifetime).toEqual(7777);
      });
    });
    describe('Test sort', () => {
      test('returns itself', () => {
        expect(globalPulseInstance.sort({ nextRunAt: 1, priority: -1 })).toEqual(globalPulseInstance);
      });
      test('sets the default sort option', () => {
        globalPulseInstance.sort({ nextRunAt: -1 });
        expect(globalPulseInstance._sort).toEqual({ nextRunAt: -1 });
      });
    });
  });

  describe('Test job methods', () => {
    describe('Test create', () => {
      let job: any;
      beforeEach(() => {
        job = globalPulseInstance.create('sendEmail', { to: 'some guy' });
      });

      test('returns a job', () => {
        expect(job).toBeInstanceOf(Job);
      });
      test('sets the name', () => {
        expect(job.attrs.name).toEqual('sendEmail');
      });
      test('sets the type', () => {
        expect(job.attrs.type).toEqual('normal');
      });
      test('sets the pulse', () => {
        expect(job.pulse).toEqual(globalPulseInstance);
      });
      test('sets the data', () => {
        //expect(job._data).to.have.property('to', 'some guy');
        expect(job.attrs.data.to).toBe('some guy');
      });
    });

    describe('Test define', () => {
      test('stores the definition for the job', () => {
        expect(globalPulseInstance._definitions.someJob.fn).toBe(jobProcessor);
      });
      describe("Test 'default' options", () => {
        test('sets the default concurrency for the job', () => {
          expect(globalPulseInstance._definitions.someJob.concurrency).toBe(5);
        });
        test('sets the default lockLimit for the job', () => {
          expect(globalPulseInstance._definitions.someJob.lockLimit).toBe(0);
        });

        test('sets the default lockLifetime for the job', () => {
          expect(globalPulseInstance._definitions.someJob.lockLifetime).toBe(600000);
        });

        test('sets the default priority for the job', () => {
          expect(globalPulseInstance._definitions.someJob.priority).toBe(0);
        });

        test('sets the default attempts for the job', () => {
          expect(globalPulseInstance._definitions.someJob.attempts).toBe(0);
        });
      });
      describe('Test setting options', () => {
        test('takes concurrency option for the job', () => {
          globalPulseInstance.define('highPriority', jobProcessor, { priority: 'high' });
          expect(globalPulseInstance._definitions.highPriority.priority).toBe('high');
        });

        test('takes shouldSaveResult option for the job', () => {
          globalPulseInstance.define('shouldSaveResultTrue', jobProcessor, { shouldSaveResult: true });
          expect(globalPulseInstance._definitions.shouldSaveResultTrue.shouldSaveResult).toBeTruthy();
        });

        test('takes attempts and backoff option for the job', () => {
          globalPulseInstance.define('attemptsAndBackoff', jobProcessor, {
            attempts: 5,
            backoff: { type: 'fixed', delay: 1000 },
          });
          expect(globalPulseInstance._definitions.attemptsAndBackoff.attempts).toBe(5);
          expect(globalPulseInstance._definitions.attemptsAndBackoff.backoff).toEqual({ type: 'fixed', delay: 1000 });
        });
      });
    });

    describe('Test every', () => {
      describe('Test with a job name specified', () => {
        test('returns a job', async () => {
          expect(await globalPulseInstance.every('5 minutes', 'send email')).toBeInstanceOf(Job);
        });
        test('sets the repeatEvery', async () => {
          const result = (await globalPulseInstance.every('5 seconds', 'send email')) as Job;
          expect(result.attrs.repeatInterval).toEqual('5 seconds');
        });
        test('sets the pulse', async () => {
          const result = (await globalPulseInstance.every('5 seconds', 'send email')) as Job;
          expect(result.pulse).toEqual(globalPulseInstance);
        });
        test('should update a job that was previously scheduled with `every`', async () => {
          await globalPulseInstance.every('10', 'shouldBeSingleJob');
          await globalPulseInstance.every('20', 'shouldBeSingleJob');

          // Give the saves a little time to propagate
          await delay(jobTimeout);

          const res = await globalPulseInstance.jobs({ name: 'shouldBeSingleJob' });
          expect(res.length).toBe(1);
        });
        test('should not run immediately if options.skipImmediate is true', async () => {
          const jobName = 'send email';
          await globalPulseInstance.every('5 minutes', jobName, {}, { skipImmediate: true });
          const job = (await globalPulseInstance.jobs({ name: jobName }))[0] as Job;
          const nextRunAt = job.attrs.nextRunAt?.getTime() as number;
          const now = new Date().getTime();
          expect(nextRunAt - now > 0).toBe(true);
        });
        test('should run immediately if options.skipImmediate is false', async () => {
          const jobName = 'send email';
          await globalPulseInstance.every('5 minutes', jobName, {}, { skipImmediate: false });
          const job = (await globalPulseInstance.jobs({ name: jobName }))[0];
          const nextRunAt = job.attrs.nextRunAt?.getTime() as number;
          const now = new Date().getTime();
          expect(nextRunAt - now <= 0).toBe(true);
        });
      });
      describe('Test with array of names specified', () => {
        test('returns array of jobs', async () => {
          const jobs = await globalPulseInstance.every('5 minutes', ['send email', 'some job']);
          expect(Array.isArray(jobs)).toBe(true);
        });
      });
    });
  });
});

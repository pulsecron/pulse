/* eslint-disable no-console,no-unused-expressions,@typescript-eslint/no-unused-expressions */

import { expect } from 'chai';
import delay from 'delay';
import { Db } from 'mongodb';

import { Pulse } from '../../src';
import { Job } from '../../src/job';
import { hasMongoProtocol } from '../../src/pulse/has-mongo-protocol';

// pulse instances
let globalPulseInstance: Pulse;
// connection string to mongodb
let mongoDbConfig: string;
// mongo db connection db instance
let mongoDb: Db;

const clearJobs = async (): Promise<void> => {
  if (mongoDb) {
    await mongoDb.collection('pulseJobs').deleteMany({});
  }
};

const jobTimeout = 500;
const jobType = 'do work';
const jobProcessor = () => {};

describe('Pulse', () => {
  beforeEach(async () => {
    if (!mongoDb) {
      const mockedMongo = await mockMongo();
      mongoDbConfig = mockedMongo.uri;
      mongoDb = mockedMongo.mongo.db();
    }

    return new Promise((resolve) => {
      globalPulseInstance = new Pulse(
        {
          mongo: mongoDb,
        },
        async () => {
          await delay(50);
          await clearJobs();
          globalPulseInstance.define('someJob', jobProcessor);
          globalPulseInstance.define('send email', jobProcessor);
          globalPulseInstance.define('some job', jobProcessor);
          globalPulseInstance.define(jobType, jobProcessor);
          return resolve();
        }
      );
    });
  });

  afterEach(async () => {
    await delay(50);
    if (globalPulseInstance) {
      await globalPulseInstance.stop();
      await clearJobs();
    }
  });

  it('sets a default processEvery', () => {
    expect(globalPulseInstance._processEvery).to.equal(5000);
  });

  describe('configuration methods', () => {
    it('sets the _db directly when passed as an option', () => {
      const pulseDb = new Pulse({ mongo: mongoDb });
      expect(pulseDb._db).to.not.equal(undefined);
    });
  });

  describe('configuration methods', () => {
    describe('mongo connection tester', () => {
      it('passing a valid server connection string', () => {
        expect(hasMongoProtocol(mongoDbConfig)).to.equal(true);
      });

      it('passing a valid multiple server connection string', () => {
        expect(hasMongoProtocol(`mongodb+srv://localhost/pulse-test`)).to.equal(true);
      });

      it('passing an invalid connection string', () => {
        expect(hasMongoProtocol(`localhost/pulse-test`)).to.equal(false);
      });
    });
    describe('mongo', () => {
      it('sets the _db directly', () => {
        const pulse = new Pulse();
        pulse.mongo(mongoDb);
        expect(pulse._db).to.not.equal(undefined);
      });

      it('returns itself', async () => {
        const pulse = new Pulse();
        expect(await pulse.mongo(mongoDb)).to.equal(pulse);
      });
    });

    describe('name', () => {
      it('sets the pulse name', () => {
        globalPulseInstance.name('test queue');
        expect(globalPulseInstance._name).to.equal('test queue');
      });
      it('returns itself', () => {
        expect(globalPulseInstance.name('test queue')).to.equal(globalPulseInstance);
      });
    });
    describe('processEvery', () => {
      it('sets the processEvery time', () => {
        globalPulseInstance.processEvery('3 minutes');
        expect(globalPulseInstance._processEvery).to.equal(180000);
      });
      it('returns itself', () => {
        expect(globalPulseInstance.processEvery('3 minutes')).to.equal(globalPulseInstance);
      });
    });
    describe('maxConcurrency', () => {
      it('sets the maxConcurrency', () => {
        globalPulseInstance.maxConcurrency(10);
        expect(globalPulseInstance._maxConcurrency).to.equal(10);
      });
      it('returns itself', () => {
        expect(globalPulseInstance.maxConcurrency(10)).to.equal(globalPulseInstance);
      });
    });
    describe('defaultConcurrency', () => {
      it('sets the defaultConcurrency', () => {
        globalPulseInstance.defaultConcurrency(1);
        expect(globalPulseInstance._defaultConcurrency).to.equal(1);
      });
      it('returns itself', () => {
        expect(globalPulseInstance.defaultConcurrency(5)).to.equal(globalPulseInstance);
      });
    });
    describe('lockLimit', () => {
      it('sets the lockLimit', () => {
        globalPulseInstance.lockLimit(10);
        expect(globalPulseInstance._lockLimit).to.equal(10);
      });
      it('returns itself', () => {
        expect(globalPulseInstance.lockLimit(10)).to.equal(globalPulseInstance);
      });
    });
    describe('defaultLockLimit', () => {
      it('sets the defaultLockLimit', () => {
        globalPulseInstance.defaultLockLimit(1);
        expect(globalPulseInstance._defaultLockLimit).to.equal(1);
      });
      it('returns itself', () => {
        expect(globalPulseInstance.defaultLockLimit(5)).to.equal(globalPulseInstance);
      });
    });
    describe('defaultLockLifetime', () => {
      it('returns itself', () => {
        expect(globalPulseInstance.defaultLockLifetime(1000)).to.equal(globalPulseInstance);
      });
      it('sets the default lock lifetime', () => {
        globalPulseInstance.defaultLockLifetime(9999);
        expect(globalPulseInstance._defaultLockLifetime).to.equal(9999);
      });
      it('is inherited by jobs', () => {
        globalPulseInstance.defaultLockLifetime(7777);
        globalPulseInstance.define('testDefaultLockLifetime', () => {});
        expect(globalPulseInstance._definitions.testDefaultLockLifetime.lockLifetime).to.equal(7777);
      });
    });
    describe('sort', () => {
      it('returns itself', () => {
        expect(globalPulseInstance.sort({ nextRunAt: 1, priority: -1 })).to.equal(globalPulseInstance);
      });
      it('sets the default sort option', () => {
        globalPulseInstance.sort({ nextRunAt: -1 });
        expect(globalPulseInstance._sort).to.eql({ nextRunAt: -1 });
      });
    });
  });

  describe('job methods', () => {
    describe('create', () => {
      let job: any;
      beforeEach(() => {
        job = globalPulseInstance.create('sendEmail', { to: 'some guy' });
      });

      it('returns a job', () => {
        expect(job).to.to.be.an.instanceof(Job);
      });
      it('sets the name', () => {
        expect(job._name).to.equal('sendEmail');
      });
      it('sets the type', () => {
        expect(job._type).to.equal('normal');
      });
      it('sets the pulse', () => {
        expect(job.pulse).to.equal(globalPulseInstance);
      });
      it('sets the data', () => {
        expect(job._data).to.have.property('to', 'some guy');
      });
    });

    describe('define', () => {
      it('stores the definition for the job', () => {
        expect(globalPulseInstance._definitions.someJob).to.have.property('fn', jobProcessor);
      });

      it('sets the default concurrency for the job', () => {
        expect(globalPulseInstance._definitions.someJob).to.have.property('concurrency', 5);
      });

      it('sets the default lockLimit for the job', () => {
        expect(globalPulseInstance._definitions.someJob).to.have.property('lockLimit', 0);
      });

      it('sets the default priority for the job', () => {
        expect(globalPulseInstance._definitions.someJob).to.have.property('priority', 0);
      });
      it('takes concurrency option for the job', () => {
        globalPulseInstance.define('highPriority', jobProcessor, { priority: 'high' });
        expect(globalPulseInstance._definitions.highPriority).to.have.property('priority', 10);
      });
    });

    describe('every', () => {
      describe('with a job name specified', () => {
        it('returns a job', async () => {
          expect(await globalPulseInstance.every('5 minutes', 'send email')).to.be.an.instanceof(Job);
        });
        it('sets the repeatEvery', async () => {
          expect(
            await globalPulseInstance.every('5 seconds', 'send email').then(({ attrs }) => _repeatInterval)
          ).to.equal('5 seconds');
        });
        it('sets the pulse', async () => {
          expect(await globalPulseInstance.every('5 seconds', 'send email').then(({ pulse }) => pulse)).to.equal(
            globalPulseInstance
          );
        });
        it('should update a job that was previously scheduled with `every`', async () => {
          await globalPulseInstance.every(10, 'shouldBeSingleJob');
          await delay(10);
          await globalPulseInstance.every(20, 'shouldBeSingleJob');

          // Give the saves a little time to propagate
          await delay(jobTimeout);

          const res = await globalPulseInstance.jobs({ name: 'shouldBeSingleJob' });
          expect(res).to.have.length(1);
        });
        it('should not run immediately if options.skipImmediate is true', async () => {
          const jobName = 'send email';
          await globalPulseInstance.every('5 minutes', jobName, {}, { skipImmediate: true });
          const job = (await globalPulseInstance.jobs({ name: jobName }))[0];
          const nextRunAt = job._nextRunAt!.getTime();
          const now = new Date().getTime();
          expect(nextRunAt - now > 0).to.equal(true);
        });
        it('should run immediately if options.skipImmediate is false', async () => {
          const jobName = 'send email';
          await globalPulseInstance.every('5 minutes', jobName, {}, { skipImmediate: false });
          const job = (await globalPulseInstance.jobs({ name: jobName }))[0];
          const nextRunAt = job._nextRunAt!.getTime();
          const now = new Date().getTime();
          expect(nextRunAt - now <= 0).to.equal(true);
        });
      });
      describe('with array of names specified', () => {
        it('returns array of jobs', async () => {
          expect(await globalPulseInstance.every('5 minutes', ['send email', 'some job'])).to.be.an('array');
        });
      });
    });

    describe('schedule', () => {
      describe('with a job name specified', () => {
        it('returns a job', async () => {
          expect(await globalPulseInstance.schedule('in 5 minutes', 'send email')).to.be.an.instanceof(Job);
        });
        it('sets the schedule', async () => {
          const fiveish = new Date().valueOf() + 250000;
          const scheduledJob = await globalPulseInstance.schedule('in 5 minutes', 'send email');
          expect(scheduledJob._nextRunAt!.valueOf()).to.be.greaterThan(fiveish);
        });
      });
      describe('with array of names specified', () => {
        it('returns array of jobs', async () => {
          expect(await globalPulseInstance.schedule('5 minutes', ['send email', 'some job'])).to.be.an('array');
        });
      });
    });
  });
});

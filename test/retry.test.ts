/* eslint-disable no-console */
import { Db } from 'mongodb';
import delay from 'delay';
import { mockMongo } from './helpers/mock-mongodb';

import { Pulse } from '../src';

// pulse instances
let pulse: Pulse;
// mongo db connection db instance
let mongoDb: Db;

const clearJobs = async (): Promise<void> => {
	if (mongoDb) {
		await mongoDb.collection('pulseJobs').deleteMany({});
	}
};

const jobType = 'do work';
const jobProcessor = () => {};

describe('Retry', () => {
	beforeEach(async () => {
		if (!mongoDb) {
			const mockedMongo = await mockMongo();
			mongoDb = mockedMongo.mongo.db();
		}

		return new Promise(resolve => {
			pulse = new Pulse(
				{
					mongo: mongoDb
				},
				async () => {
					await delay(50);
					await clearJobs();
					pulse.define('someJob', jobProcessor);
					pulse.define('send email', jobProcessor);
					pulse.define('some job', jobProcessor);
					pulse.define(jobType, jobProcessor);
					return resolve();
				}
			);
		});
	});

	afterEach(async () => {
		await delay(50);
		await pulse.stop();
		await clearJobs();
		// await mongoClient.disconnect();
		// await jobs._db.close();
	});

	it('should retry a job', async () => {
		let shouldFail = true;

		pulse.processEvery(100); // Shave 5s off test runtime :grin:
		pulse.define('a job', (_job, done) => {
			if (shouldFail) {
				shouldFail = false;
				return done(new Error('test failure'));
			}

			done();
			return undefined;
		});

		pulse.on('fail:a job', (err, job) => {
			if (err) {
				// Do nothing as this is expected to fail.
			}

			job.schedule('now').save();
		});

		const successPromise = new Promise(resolve => {
			pulse.on('success:a job', resolve);
		});

		await pulse.now('a job');

		await pulse.start();
		await successPromise;
	}).timeout(100000);
});

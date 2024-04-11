/**
 * @file Illustrate concurrency and locking
 */
import Pulse from '../dist';

function time() {
  return new Date().toTimeString().split(' ')[0];
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const pulse = new Pulse({
  db: {
    address: 'mongodb://localhost:27017/pulse-concurrency',
    collection: `pulseJobs-${Math.random()}`,
  },
});

let jobRunCount = 1;
pulse.define(
  'long-running job',
  {
    lockLifetime: 5 * 1000, // Max amount of time the job should take
    concurrency: 3, // Max number of job instances to run at the same time
  },
  async (job, done) => {
    const thisJob = jobRunCount++;
    console.log(`#${thisJob} started`);

    // 3 job instances will be running at the same time, as specified by `concurrency` above
    await sleep(30 * 1000);
    // Comment the job processing statement above, and uncomment one of the blocks below



    // Only one job will run at a time because 3000 < lockLifetime
    // await sleep(3 * 1000);

    console.log(`#${thisJob} finished`);
    done();
  }
);

(async function () {
  console.log(time(), 'Pulse started');
  pulse.processEvery('1 second');
  await pulse.start();
  await pulse.every('1 second', 'long-running job');

  // Log job start and completion/failure
  pulse.on('start', (job) => {
    console.log(time(), `Job <${job.attrs.name}> starting`);
  });
  pulse.on('success', (job) => {
    console.log(time(), `Job <${job.attrs.name}> succeeded`);
  });
  pulse.on('fail', (error, job) => {
    console.log(time(), `Job <${job.attrs.name}> failed:`, error);
  });
})();
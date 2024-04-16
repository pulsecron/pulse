# Quick Start

### Installation

```bash
npm i @pulsecron/pulse
```



### Example&#x20;

```typescript
import Pulse from '@pulsecron/pulse';

const mongoConnectionString = 'mongodb://localhost:27017/pulse';

const pulse = new Pulse({ db: { address: mongoConnectionString } });

// Or override the default collection name:
// const pulse = new Pulse({db: {address: mongoConnectionString, collection: 'jobCollectionName'}});

// or pass additional connection options:
// const pulse = new Pulse({db: {address: mongoConnectionString, collection: 'jobCollectionName', options: {ssl: true}}});

// or pass in an existing mongodb-native MongoClient instance
// const pulse = new Pulse({mongo: myMongoClient});

/**
 * Example of defining a job
 */
pulse.define('delete old users', async (job) => {
  console.log('Deleting old users...');
  return;
});

/**
 * Example of repeating a job
 */
(async function () {
  // IIFE to give access to async/await
  await pulse.start();

  await pulse.every('3 minutes', 'delete old users');

  // Alternatively, you could also do:
  await pulse.every('*/3 * * * *', 'delete old users');
})();

/**
 * Example of defining a job with options
 */
pulse.define(
  'send email report',
  async (job) => {
    const { to } = job.attrs.data;

    console.log(`Sending email report to ${to}`);
  },
  { lockLifetime: 5 * 1000, priority: 'high', concurrency: 10 }
);

/**
 * Example of scheduling a job
 */
(async function () {
  await pulse.start();
  await pulse.schedule('in 20 minutes', 'send email report', { to: 'admin@example.com' });
})();

/**
 * Example of repeating a job
 */
(async function () {
  const weeklyReport = pulse.create('send email report', { to: 'example@example.com' });
  await pulse.start();
  await weeklyReport.repeatEvery('1 week').save();
})();

/**
 * Check job start and completion/failure
 */
pulse.on('start', (job) => {
  console.log(time(), `Job <${job.attrs.name}> starting`);
});
pulse.on('success', (job) => {
  console.log(time(), `Job <${job.attrs.name}> succeeded`);
});
pulse.on('fail', (error, job) => {
  console.log(time(), `Job <${job.attrs.name}> failed:`, error);
});

function time() {
  return new Date().toTimeString().split(' ')[0];
}
```

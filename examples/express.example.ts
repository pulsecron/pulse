import express from 'express';
import Pulse, { JobAttributesData } from '@pulsecron/pulse';

const app = express();
const port = 3000; // You can choose any port that is free on your system

// Pulse setup
const mongoConnectionString = 'mongodb://localhost:27017/pulse';
const pulse = new Pulse({
  db: { address: mongoConnectionString, collection: 'cronjob' },
  defaultConcurrency: 4,
  maxConcurrency: 4,
  processEvery: '10 seconds',
  resumeOnRestart: true,
});

interface ProcessJobData extends JobAttributesData {
  to: string;
}

// Define jobs
pulse.define<ProcessJobData>(
  'send nudge email',
  async (job, done) => {
    const { to } = job.attrs.data;
    // Implement your email sending logic here
    done();
  },
  { shouldSaveResult: true, attempts: 1, backoff: { type: 'fixed', delay: 60000 } }
);

pulse.define<ProcessJobData>(
  'send weekly report',
  async (job, done) => {
    const { to } = job.attrs.data;
    // Implement your report generation logic here
    done();
  },
  { shouldSaveResult: true, attempts: 5, backoff: { type: 'exponential', delay: 1000 } }
);

// Express routes to trigger jobs
app.post('/send-nudge-email', async (req, res) => {
  try {
    await pulse.start();
    const job = pulse.create('send nudge email', { to: req.body.to });
    await job.schedule(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)).save();
    res.status(200).send('Nudge email scheduled successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to schedule nudge email');
  }
});

app.post('/send-weekly-report', async (req, res) => {
  try {
    await pulse.start();
    const job = pulse.create('send weekly report', { to: req.body.to });
    await job.repeatEvery('1 week').save();
    res.status(200).send('Weekly report scheduled successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to schedule weekly report');
  }
});

pulse.on('ready', (job) => {
  console.log(time(), 'Pulse is ready');
});
pulse.on('start', (job) => {
  console.log(time(), `Job <${job.attrs.name}> starting`);
});
pulse.on('success', (job) => {
  console.log(time(), `Job <${job.attrs.name}> succeeded`);
});
pulse.on('fail', (error, job) => {
  console.log(time(), `Job <${job.attrs.name}> failed:`, error);
});
pulse.on('complete', async (job) => {
  console.log(time(), `Job <${job.attrs.name}> completed`);
});

function time() {
  return new Date().toISOString();
}

// Start Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

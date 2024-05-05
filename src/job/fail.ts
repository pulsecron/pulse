import createDebugger from 'debug';
import { Job } from '.';

const debug = createDebugger('pulse:job');

export type FailMethod = (reason: string | Error) => Job;

/**
 * Fails the job with a reason (error) specified
 * @name Job#fail
 * @function
 * @param reason reason job failed
 */
export const fail: FailMethod = function (this: Job, reason) {
  const failReason = reason instanceof Error ? reason.message : reason;

  const attrs = this.attrs;
  attrs.failReason = failReason;
  attrs.failCount = (attrs.failCount || 0) + 1;
  attrs.runCount = attrs.runCount || 1;
  const now = new Date();
  attrs.failedAt = attrs.lastFinishedAt = now;

  debug('[%s:%s] fail() called [%d] times so far', attrs.name, attrs._id, attrs.failCount);

  const attempts = attrs.attempts || 0;
  const step = attrs.runCount <= attempts * (attempts + 1) ? Math.ceil(attrs.runCount / (attempts + 1)) : attempts;
  const retryCount = attrs.failCount - step;

  const backoff = attrs.backoff;
  if (attempts && backoff && retryCount < step * attempts) {
    const delayMultiplier = backoff.type === 'fixed' ? 1 : Math.pow(2, retryCount);
    attrs.nextRunAt = new Date(now.getTime() + delayMultiplier * backoff.delay);

    // Log next retry time
    debug('[%s:%s] setting retry at time [%s]', attrs.name, attrs._id, attrs.nextRunAt);
  }

  return this;
};

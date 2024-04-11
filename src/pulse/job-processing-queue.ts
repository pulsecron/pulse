import { Job } from '../job';

/**
 * @class
 * @param {Object} args - Job Options
 * @property {Object} pulse - The Pulse instance
 * @property {Object} attrs
 */
class JobProcessingQueue {
  protected _queue: Job[];

  constructor() {
    this._queue = [];
  }

  get length(): number {
    return this._queue.length;
  }

  /**
   * Pops and returns last queue element (next job to be processed) without checking concurrency.
   * @returns Next Job to be processed
   */
  pop(this: JobProcessingQueue) {
    return this._queue.pop();
  }

  /**
   * Inserts job in queue where it will be order from left to right in decreasing
   * order of nextRunAt and priority (in case of same nextRunAt), if all values
   * are even the first jobs to be introduced will have priority
   * @param job job to add to queue
   */

  insert(this: JobProcessingQueue, job: Job) {
    const matchIndex = this._queue.findIndex((element) => {
      if (element.attrs.nextRunAt!.getTime() <= job.attrs.nextRunAt!.getTime()) {
        if (element.attrs.nextRunAt!.getTime() === job.attrs.nextRunAt!.getTime()) {
          if (element.attrs.priority >= job.attrs.priority) {
            return true;
          }
        } else {
          return true;
        }
      }

      return false;
    });

    if (matchIndex === -1) {
      this._queue.push(job);
    } else {
      this._queue.splice(matchIndex, 0, job);
    }
  }

  /**
   * Inserts job in first queue position
   * @param job job to add to queue
   */
  push(this: JobProcessingQueue, job: Job) {
    this._queue.push(job);
  }

  /**
   * Returns (does not pop, element remains in queue) first element (always from the right)
   * that can be processed (not blocked by concurrency execution)
   * @param pulseDefinitions job to add to queue
   * @returns Next Job to be processed
   */
  returnNextConcurrencyFreeJob(this: JobProcessingQueue, pulseDefinitions: any) {
    let next;
    for (next = this._queue.length - 1; next > 0; next -= 1) {
      const def = pulseDefinitions[this._queue[next].attrs.name];
      if (def.concurrency > def.running) {
        break;
      }
    }

    return this._queue[next];
  }
}

export { JobProcessingQueue };

import createDebugger from 'debug';
import { Pulse } from '.';

const debug = createDebugger('pulse:maxConcurrency');

/**
 * Set the concurrency for jobs (globally), type does not matter
 * @name Pulse#maxConcurrency
 * @function
 * @param concurrency max concurrency value
 * @returns pulse instance
 */
export const maxConcurrency = function (this: Pulse, concurrency: number): Pulse {
  debug('Pulse.maxConcurrency(%d)', concurrency);
  this._maxConcurrency = concurrency;
  return this;
};

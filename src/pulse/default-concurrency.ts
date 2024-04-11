import createDebugger from 'debug';
import { Pulse } from '.';

const debug = createDebugger('pulse:defaultConcurrency');

/**
 * Set the default concurrency for each job
 * @name Pulse#defaultConcurrency
 * @function
 * @param concurrency default concurrency
 */
export const defaultConcurrency = function (this: Pulse, concurrency: number): Pulse {
  debug('Pulse.defaultConcurrency(%d)', concurrency);
  this._defaultConcurrency = concurrency;
  return this;
};

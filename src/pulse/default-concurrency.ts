import createDebugger from 'debug';
import { Pulse } from '.';

const debug = createDebugger('pulse:defaultConcurrency');

export type DefaultConcurrencyMethod = (concurrency: number) => Pulse;
/**
 * Set the default concurrency for each job
 * @name Pulse#defaultConcurrency
 * @function
 * @param concurrency default concurrency
 */
export const defaultConcurrency: DefaultConcurrencyMethod = function (this: Pulse, concurrency) {
  debug('Pulse.defaultConcurrency(%d)', concurrency);
  this._defaultConcurrency = concurrency;
  return this;
};

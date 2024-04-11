import createDebugger from 'debug';
import { Pulse } from '.';

const debug = createDebugger('pulse:defaultLockLimit');

/**
 * Set default lock limit per job type
 * @name Pulse#defaultLockLimit
 * @function
 * @param {Number} num Lock limit per job
 * @returns {Pulse} pulse instance
 */
export const defaultLockLimit = function (this: Pulse, times: number): Pulse {
  debug('Pulse.defaultLockLimit(%d)', times);
  this._defaultLockLimit = times;
  return this;
};

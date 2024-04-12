import createDebugger from 'debug';
import { Pulse } from '.';

const debug = createDebugger('pulse:defaultLockLimit');

export type DefaultLockLimitMethod = (times: number) => Pulse;
/**
 * Set default lock limit per job type
 * @name Pulse#defaultLockLimit
 * @function
 * @param {Number} num Lock limit per job
 * @returns {Pulse} pulse instance
 */
export const defaultLockLimit: DefaultLockLimitMethod = function (this: Pulse, times) {
  debug('Pulse.defaultLockLimit(%d)', times);
  this._defaultLockLimit = times;
  return this;
};

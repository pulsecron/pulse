import createDebugger from 'debug';
import { Pulse } from '.';

const debug = createDebugger('pulse:defaultLockLifetime');

export type DefaultLockLifetimeMethod = (ms: number) => Pulse;

/**
 * Set the default lock time (in ms)
 * Default is 10 * 60 * 1000 ms (10 minutes)
 * @name Pulse#defaultLockLifetime
 * @function
 * @param {Number} ms time in ms to set default lock
 */
export const defaultLockLifetime: DefaultLockLifetimeMethod = function (this: Pulse, ms) {
  debug('Pulse.defaultLockLifetime(%d)', ms);
  this._defaultLockLifetime = ms;
  return this;
};

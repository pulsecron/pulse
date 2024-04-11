import createDebugger from 'debug';
import humanInterval from 'human-interval';
import { Pulse } from '.';

const debug = createDebugger('pulse:processEvery');

/**
 * Set the default process interval
 * @name Pulse#processEvery
 * @function
 * @param time - time to process, expressed in human interval
 */
export const processEvery = function (this: Pulse, time: string): Pulse {
  debug('Pulse.processEvery(%d)', time);
  // @ts-expect-error
  this._processEvery = humanInterval(time);
  return this;
};

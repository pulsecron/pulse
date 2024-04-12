import createDebugger from 'debug';
import humanInterval from 'human-interval';
import { Pulse } from '.';

const debug = createDebugger('pulse:processEvery');

export type ProcessEveryMethod = (time: string) => Pulse;
/**
 * Set the default process interval
 * @name Pulse#processEvery
 * @function
 * @param time - time to process, expressed in human interval
 */
export const processEvery: ProcessEveryMethod = function (this: Pulse, time) {
  debug('Pulse.processEvery(%d)', time);
  // @ts-expect-error
  this._processEvery = humanInterval(time);
  return this;
};

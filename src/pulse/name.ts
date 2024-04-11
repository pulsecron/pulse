import createDebugger from 'debug';
import { Pulse } from '.';

const debug = createDebugger('pulse:name');

/**
 * Set name of queue
 * @name Pulse#name
 * @function
 * @param name name of pulse instance
 */
export const name = function (this: Pulse, name: string): Pulse {
  debug('Pulse.name(%s)', name);
  this._name = name;
  return this;
};

import createDebugger from 'debug';
import { Pulse } from '.';

const debug = createDebugger('pulse:name');

export type NameMethod = (name: string) => Pulse;
/**
 * Set name of queue
 * @name Pulse#name
 * @function
 * @param name name of pulse instance
 */
export const name: NameMethod = function (this: Pulse, name) {
  debug('Pulse.name(%s)', name);
  this._name = name;
  return this;
};

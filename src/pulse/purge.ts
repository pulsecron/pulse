import createDebugger from 'debug';
import { Pulse } from '.';

const debug = createDebugger('pulse:purge');

export type PurgeMethod = () => Promise<number | undefined>;
/**
 * Removes all jobs from queue
 * @name Pulse#purge
 * @function
 * @returns resolved when job cancelling fails or passes
 */
export const purge: PurgeMethod = async function (this: Pulse) {
  // @NOTE: Only use after defining your jobs
  const definedNames = Object.keys(this._definitions);
  debug('Pulse.purge(%o)', definedNames);
  return this.cancel({ name: { $not: { $in: definedNames } } });
};

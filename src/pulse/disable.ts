import createDebugger from 'debug';
import { Filter } from 'mongodb';
import { Pulse } from '.';
const debug = createDebugger('pulse:disable');

export type DisableMethod = (query?: Filter<unknown>) => Promise<number>;
/**
 * Disables any jobs matching the passed MongoDB query by setting the `disabled` flag to `true`
 * @name Pulse#disable
 * @function
 * @param query MongoDB query to use when enabling
 * @returns {Promise<number>} Resolved with the number of disabled job instances.
 */
export const disable: DisableMethod = async function (this: Pulse, query = {}) {
  debug('attempting to disable all jobs matching query', query);
  try {
    const { modifiedCount } = await this._collection.updateMany(query, {
      $set: { disabled: true },
    });
    debug('%s jobs disabled');
    return modifiedCount;
  } catch (error) {
    debug('error trying to mark jobs as `disabled`');
    throw error;
  }
};

import createDebugger from 'debug';
import { Filter } from 'mongodb';
import { Pulse } from '.';
const debug = createDebugger('pulse:enable');

/**
 * Enables any jobs matching the passed MongoDB query by setting the `disabled` flag to `false`
 * @name Pulse#enable
 * @function
 * @param query MongoDB query to use when enabling
 * @caller client code, Pulse.purge(), Job.remove()
 * @returns {Promise<Number>} A promise that contains the number of removed documents when fulfilled.
 */
export const enable = async function (this: Pulse, query: Filter<unknown> = {}): Promise<number> {
  debug('attempting to enable all jobs matching query', query);
  try {
    const { modifiedCount } = await this._collection.updateMany(query, {
      $set: { disabled: false },
    });
    debug('%s jobs enabled', modifiedCount);
    return modifiedCount;
  } catch (error) {
    debug('error trying to mark jobs as `enabled`');
    throw error;
  }
};

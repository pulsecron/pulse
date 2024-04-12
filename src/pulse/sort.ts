import createDebugger from 'debug';
import { Pulse } from '.';

const debug = createDebugger('pulse:sort');

export type SortMethod = (query: any) => Pulse;
/**
 * Set the sort query for finding next job
 * Default is { nextRunAt: 1, priority: -1 }
 * @name Pulse#sort
 * @function
 * @param query sort query object for MongoDB
 */
export const sort: SortMethod = function (this: Pulse, query) {
  debug('Pulse.sort([Object])');
  this._sort = query;
  return this;
};

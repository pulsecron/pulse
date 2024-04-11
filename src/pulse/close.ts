import createDebugger from 'debug';
import { Pulse } from '.';

const debug = createDebugger('pulse:close');

/** Close the db and it's underlying connections
 * Only works if pulse was instantiated without preconfigured mongoDb instance.
 * If the mongoDb instance was supplied during instantiation or via pulse.mongo, this function will do nothing and return pulse anyway.
 * @name Pulse#close
 * @function
 * @param [option] {{ force: boolean }} Force close, emitting no events
 *
 *
 * @caller client code
 *
 * @link https://mongodb.github.io/node-mongodb-native/2.0/api/Db.html#close
 */
export const close = async function (this: Pulse, option?: { force: boolean }): Promise<Pulse> {
  debug('close db connection for this pulse instance');
  const closeOptions = {
    force: false,
    ...option,
  };
  try {
    if (this._db) {
      await this._db.close(closeOptions.force);
    }

    return this;
  } catch (error) {
    debug('error trying to close db connection to');
    throw error;
  }
};

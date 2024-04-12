import { Job } from '.';

export type RemoveMethod = () => Promise<number | undefined>;
/**
 * Remove the job from MongoDB
 * @name Job#remove
 * @function
 */
export const remove: RemoveMethod = async function (this: Job) {
  return this.pulse.cancel({ _id: this.attrs._id });
};

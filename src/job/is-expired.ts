import { Job } from '.';

export type IsExpiredMethod = (useRealStatus?: boolean) => boolean;
export const isExpired: IsExpiredMethod = function (this: Job, useRealStatus = false) {
  if (useRealStatus) {
    this.fetchStatus();
  }
  const definition = this.pulse._definitions[this.attrs.name];

  const lockDeadline = new Date(Date.now() - definition.lockLifetime);

  if (this.attrs.lockedAt && this.attrs.lockedAt < lockDeadline) {
    return true;
  }
  return false;
};

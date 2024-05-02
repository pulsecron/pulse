import { Job } from '.';

interface FetchStatusResponse {
  status: boolean;
  reason?: string;
  lastRunAt?: Date;
  lockedAt?: Date;
  lastFinishedAt?: Date;
}

export type FetchStatusMethod = () => Promise<FetchStatusResponse>;

export const fetchStatus: FetchStatusMethod = async function (this: Job) {
  const dbJob = await this.pulse.getJobsRepo({ _id: this.attrs._id });
  if (!dbJob || dbJob.length === 0) {
    return {
      status: false,
      reason: `job with id ${this.attrs._id} not found in database`,
    };
  }

  this.attrs.lastRunAt = dbJob[0].lastRunAt;
  this.attrs.lockedAt = dbJob[0].lockedAt;
  this.attrs.lastFinishedAt = dbJob[0].lastFinishedAt;

  return {
    status: true,
    lastRunAt: this.attrs.lastRunAt || dbJob[0].lastRunAt,
    lockedAt: this.attrs.lockedAt || dbJob[0].lockedAt,
    lastFinishedAt: this.attrs.lastFinishedAt || dbJob[0].lastFinishedAt,
  };
};

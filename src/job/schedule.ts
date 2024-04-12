// @ts-expect-error
import date from 'date.js';
import { Job } from '.';

export type ScheduleMethod = (time: string | Date) => Job;
/**
 * Schedules a job to run at specified time
 * @name Job#schedule
 * @function
 * @param time schedule a job to run "then"
 */
export const schedule: ScheduleMethod = function (this: Job, time) {
  const d = new Date(time);
  this.attrs.nextRunAt = Number.isNaN(d.getTime()) ? date(time) : d;
  return this;
};

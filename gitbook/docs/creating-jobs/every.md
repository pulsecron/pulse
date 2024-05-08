# Every



## `pulse.every(interval, names, data?, options?)`

{% hint style="info" %}
The `every` method schedules one or more jobs to run repeatedly at specified intervals. It allows for precise control over job execution timing and can be used to schedule routine tasks such as data synchronization, report generation, or regular maintenance tasks.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

pulse.start()
// Set a custom sort order for job processing
pulse.every('1 day', 'dailyReport', { reportId: 123 });

// Schedule multiple jobs to run every 30 minutes
pulse.every('30 minutes', ['updateCache', 'refreshData'], null, { skipImmediate: true });
```



### Parameters

* **`interval`** (`string`): The interval at which the job(s) should run. This can be a human-readable format, such as '5 minutes', '1 hour', a [cron format](https://www.npmjs.com/package/cron-parser) `String`, or a `Number`
* **`names`** (`string | string[]`): The name or array of names of the job(s) to be scheduled. Each name corresponds to a job type previously defined with the `define` method.
* **`data`** (`T` - optional): Data to pass to the job when it runs. This could be any type of data required by the job for its execution.
* **`options`** (`JobOptions` - optional): Additional options for the job execution, such as starting the job at a specific time, setting a limit on the number of times the job should repeat, or other job-specific settings.
  * **`timezone`** (`string` - optional): The timezone to use for scheduling the job, useful for jobs that depend on specific regional settings.
  * **`startDate`** (`Date | number` - optional): The start date or timestamp from which the job should begin executing. _(_Only available  when _interval format is a cron format)_
  * **`endDate`** (`Date | number` - optional): The end date or timestamp after which the job should no longer execute. _(_Only available  when _interval format is a cron format)_
  * **`skipDays`** (`string` - optional): A string defining days to skip; used for creating more complex schedules. `e.g. 2 days`
  * **`skipImmediate`** (`boolean` - optional): If set to true, skips the immediate first execution of the job schedule.

### Returns

* **`Promise<Job | Job[]>`**: A promise that resolves with the created job or jobs. The promise will resolve after the jobs have been scheduled, or it will reject if there is an error during scheduling.




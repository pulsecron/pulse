# Schedule



## `pulse.schedule(when, names, data?)`

{% hint style="info" %}
The `schedule` method allows you to set a specific time for a job or multiple jobs to be executed. This is useful for tasks that must occur at precise times rather than at regular intervals.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

// Schedule a single job to run next Monday at 9 AM
const nextMonday = new Date();
nextMonday.setDate(nextMonday.getDate() + ((1 + 7 - nextMonday.getDay()) % 7 || 7));
nextMonday.setHours(9, 0, 0, 0);

pulse.schedule(nextMonday, 'weeklyMeetingReminder', { meetingId: 456 });

pulse.schedule('tomorrow at noon', [
	'printAnalyticsReport',
	'sendNotifications',
	'updateUserRecords'
]);
```



#### Parameters

* **`when`** (`string | Date`): The specific time when the job should be executed. This can be a string representing a date or a `Date` object.
* **`names`** (`string | string[]`): The name or array of names of the job(s) to be scheduled. Each name corresponds to a job type previously defined with the `define` method.
* **`data`** (`T` - optional): Data to pass to the job when it runs. This could be any type of data required by the job for its execution.

#### Returns

* **`Promise<Job | Job[]>`**: A promise that resolves with the created job or jobs. The promise will resolve after the job has been scheduled, or it will reject if there is an error during scheduling.




# RepeatEvery



## `job.repeatEvery(interval, options?)`

{% hint style="info" %}
The `repeatEvery` method schedules a job to repeat at a defined interval. It includes options to specify starting and ending dates, skip specific days, and adjust for time zones, providing flexibility in how and when the job recurs.\


_This does **NOT** save the job in the database.  you must explicitly declare_ [_`save()`_](save.md)_if you want to save it_
{% endhint %}

### Example Usage

{% code fullWidth="false" %}
```typescript
const job = pulse.create('test', {});
job.unique({ 'data.type': 'email', 'data.userId': '12345' });
await job.save(); // If you want to save it

```
{% endcode %}

### Parameters

* **`interval`** (`string`): A human-readable string that specifies how often the job should run, such as `'5 minutes'`, `'2 hours'`, `'1 day'`.
* **`options`** (`JobOptions` - optional): Additional settings to further configure the repeating job:
  * **`timezone`** (`string` - optional): The timezone in which to base the job's timing.
  * **`startDate`** (`Date | number` - optional): A specific start date or timestamp from which the job should start repeating.
  * **`endDate`** (`Date | number` - optional): A specific end date or timestamp after which the job should no longer repeat.
  * **`skipDays`** (`string` - optional): A string representing days to skip, useful for setting jobs to run only on specific days of the week.\
    `e.g. ('2 days')`
  * **`skipImmediate`** (`boolean` - optional): If `true`, skips the immediate first execution of the job schedule.

\


### Returns

* **`Job`**: Returns the job instance, allowing for method chaining.

\





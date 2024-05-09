# RepeatAt



## `job.repeatAt(time)`

{% hint style="info" %}
The `repeatAt` method schedules a job to repeat at a specific time that is stated in a [human-readable format](https://github.com/matthewmueller/date#examples) or as a precise time value. This capability is essential for scheduling jobs that must run at regular intervals on specific schedules.\


_This does **NOT** save the job in the database.  you must explicitly declare_ [_`save()`_](save.md)_if you want to save it_
{% endhint %}

### Example Usage

{% code fullWidth="false" %}
```typescript
const job = pulse.create('test', {});
job.repeatAt("17:00");
await job.save(); // If you want to save it

```
{% endcode %}

### Parameters



* **`time`** (`string`): The time at which the job should repeat. This can be specified in a human-readable format (e.g., "03:00 PM", "15:00").[ Format docs](https://github.com/matthewmueller/date#examples)

\


### Returns

* **`Job`**: Returns the job instance, allowing for method chaining. This facilitates additional configurations or method calls to be chained after setting the repeat time.

\





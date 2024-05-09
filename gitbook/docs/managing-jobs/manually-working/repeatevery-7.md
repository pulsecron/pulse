# Fail



## `job.fail()`

{% hint style="info" %}
The `fail` method marks a job as failed and updates its attributes accordingly. It records the reason for failure, increments the failure count, and, if the job configuration permits, schedules the job for a retry based on the specified backoff strategy.\
\
_This does **NOT** save the job in the database.  you must explicitly declare_ [_`save()`_](save.md)_if you want to save it_
{% endhint %}

### Example Usage

{% code fullWidth="false" %}
```typescript
const job = pulse.create('test', {});
job.fail(new Error('Unable to connect to database'));
job.save(); // If you want to save it
```
{% endcode %}

### Parameters

* **`reason`** (`string | Error`): The reason for the job's failure, which can be provided as either a string or an Error object. If an Error object is provided, its message is used as the failure reason.

\


### Returns

* **`Job`**: Returns the job instance, allowing for method chaining.

\


\


\





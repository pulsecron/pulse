# Enable



## `job.enable()`

{% hint style="info" %}
The `enable` method sets a job's status to active, allowing it to be run by the job processing system. This is useful for resuming the execution of a job that was previously halted without removing it from the job queue.

\
_This does **NOT** save the job in the database.  you must explicitly declare_ [_`save()`_](save.md)_if you want to save it_
{% endhint %}

### Example Usage

{% code fullWidth="false" %}
```typescript
const job = pulse.create('test', {});
job.enable();
job.save(); // If you want to save it
```
{% endcode %}

### Parameters



\


### Returns

* **`Job`**: Returns the job instance, enabling method chaining. This allows for further modifications to the job or chaining additional method calls.

\


\


\





# Disable



## `job.disable()`

{% hint style="info" %}
The `disable` method sets a job's status to disabled, preventing it from being run by the job processing system. This is useful for temporarily halting a job's execution without permanently removing it from the job queue.

\
_This does **NOT** save the job in the database.  you must explicitly declare_ [_`save()`_](save.md)_if you want to save it_
{% endhint %}

### Example Usage

{% code fullWidth="false" %}
```typescript
const job = pulse.create('test', {});
job.disable();
job.save(); // If you want to save it
```
{% endcode %}

### Parameters



\


### Returns

* **`Job`**: Returns the job instance, allowing for method chaining. This facilitates further modifications to the job or chaining additional method calls.

\


\


\





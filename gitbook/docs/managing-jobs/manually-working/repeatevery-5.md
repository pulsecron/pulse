# Touch



## `job.touch()`

{% hint style="info" %}
The `touch` method updates the `lockedAt` timestamp of a job to the current time. This is particularly useful for ensuring that a job remains locked during long-running processes, preventing it from being considered as timed out or available for reprocessing by other workers or job instances.


{% endhint %}

### Example Usage

{% code fullWidth="false" %}
```typescript
const job = pulse.create('test', {});
job.touch();
```
{% endcode %}

### Parameters



\


### Returns

* **`Promise<Job>`**: A promise that resolves with the updated job instance after the `lockedAt` time has been refreshed and the job has been saved.

\


\





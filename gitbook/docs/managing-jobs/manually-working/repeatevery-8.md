# Run



## `job.run()`

{% hint style="info" %}
The `run` method executes the processing logic defined for a specific job, handling lifecycle events and managing job state updates based on execution results. It's designed to be an internal method that drives the main execution flow of jobs within the system.

\
**Normally you never need to call this manually.**
{% endhint %}

### Example Usage

{% code fullWidth="false" %}
```typescript
const job = pulse.create('test', {});
job.run()
  .then(() => console.log('Job execution completed.'))
  .catch(error => console.error('Job execution failed:', error));
```
{% endcode %}

### Parameters



\


### Returns

* **`Promise<Job>`**: A promise that resolves with the job instance after execution, whether successful or not. This method handles both successful completion and errors internally, ensuring the job's state is updated accordingly.

\


\


\





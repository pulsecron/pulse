# Save



## `job.save()`

{% hint style="info" %}
The `save` method commits the current state of a job to the MongoDB database. This operation is essential for ensuring that changes made to a job's attributes, such as status updates, data modifications, or configuration changes, are not lost and are fully recoverable.
{% endhint %}

### Example Usage

{% code fullWidth="false" %}
```typescript
const pulse = new Pulse();

pulse.define('test', async (job) => {
  if (job.isExpired()) {
    console.log('The job lock has expired.');
  } else {
    console.log('The job lock is still valid.');
  }
});


```
{% endcode %}

### Parameters

*

### Returns

* **`Promise<Job>`**: A promise that resolves with the updated job instance once the save operation completes successfully. If there is an error during the save operation, the promise will reject with an error.

\





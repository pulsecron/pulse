# isExpired



## `pulse.isExpired(useRealStatus?)`

{% hint style="info" %}
The `isExpired` method determines whether a job's lock has expired, indicating that the job may be considered stalled or failed if it has not been updated within the expected lock lifetime.
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

* **`useRealStatus`** (`boolean` - optional): If `true`, the job's current status will be refreshed from the database before checking if the lock is expired. Defaults to `false`.

### Returns

* **`boolean`**: Returns `true` if the job's lock has expired, otherwise `false`.

\





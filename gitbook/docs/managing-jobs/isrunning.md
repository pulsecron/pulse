# isRunning



## `pulse.isRunning(useRealStatus?)`

{% hint style="info" %}
The `isRunning` method checks if a job is currently active (i.e., running). A job is considered running if it has started but not yet finished, or if it has restarted after its last completion.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

pulse.define('test', async (job) => {
   if (job.isRunning()) {
    console.log('The job is currently running.');
  } else {
    console.log('The job is not running.');
  }
});


```

#### Parameters

* **`useRealStatus`** (`boolean` - optional): If `true`, the job will query the database to refresh its status before determining if it is running. This ensures the method uses the most current data available. Defaults to `false`, which uses the status as currently loaded in the job object.

#### Returns

* **`boolean`**: Returns `true` if the job is currently running, otherwise `false`.

\





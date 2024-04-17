# Enable



## `pulse.enable(query)`

{% hint style="info" %}
The `enable` method reverses the effects of the `disable` method by updating job records in the MongoDB database to clear the `disabled` flag, allowing them to be processed again by the job scheduler. This is useful for resuming job execution after a temporary pause.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

// Example of enabling all jobs that were disabled for a maintenance window
const maintenanceQuery = { reason: 'maintenance' };

pulse.enable(maintenanceQuery)
  .then(modifiedCount => console.log(`${modifiedCount} jobs re-enabled after maintenance`))
  .catch(error => console.error('Failed to enable jobs:', error));
```



#### Parameters

* **`query`** (`Filter<unknown>` - optional): A MongoDB filter query to select the jobs to be enabled. If no query is provided, it defaults to an empty object `{}`, potentially enabling all jobs if not used with caution.

#### Returns

* **`Promise<number>`**: A promise that resolves with the number of job records that were modified to an enabled state. This count provides an indication of how many jobs were affected by the operation.

\





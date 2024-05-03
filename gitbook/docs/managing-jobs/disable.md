# Disable



## `pulse.disable(query)`

{% hint style="info" %}
The `disable` method updates job records in the MongoDB database to set a `disabled` flag to `true`, effectively halting their execution by the job processor. This method allows for selective disabling of jobs without removing them from the database, providing a way to pause job execution as needed.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

// Example of disabling all jobs that are scheduled to run on weekends
const weekendQuery = { runDay: { $in: ['Saturday', 'Sunday'] } };

pulse.disable(weekendQuery)
  .then(modifiedCount => console.log(`${modifiedCount} jobs scheduled for weekends were disabled`))
  .catch(error => console.error('Failed to disable jobs:', error));
```



### Parameters

* **`query`** (`Filter<unknown>` - optional): A MongoDB filter query to select the jobs to be disabled. If no query is provided, it defaults to an empty object `{}`, which could potentially disable all jobs if not used cautiously.

### Returns

* **`Promise<number>`**: A promise that resolves with the number of job records that were modified to a disabled state. This count provides feedback on the impact of the call.

\





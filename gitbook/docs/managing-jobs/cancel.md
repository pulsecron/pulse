# Cancel



## `pulse.cancel(query)`

{% hint style="info" %}
The `cancel` method is designed to cancel and permanently remove jobs from the MongoDB database that match a specified query. This functionality is critical for managing job lifecycles, particularly when certain jobs are no longer needed or conditions change requiring their termination.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

// Example of canceling all jobs with a specific priority
const query = { priority: { $lt: 0 } }; // Cancels all jobs with a negative priority

pulse.cancel(query)
  .then(deletedCount => console.log(`${deletedCount} low priority jobs cancelled`))
  .catch(error => console.error('Failed to cancel jobs:', error));
```



### Parameters

* **`query`** (`Filter<Document>`): A MongoDB query that specifies which jobs to cancel and delete. This query should conform to MongoDB's query standards and can include various criteria to match specific jobs.

### Returns

* **`Promise<number | undefined>`**: Returns a promise that resolves with the number of jobs deleted from the database. If no jobs are found that match the query, the promise may resolve to `undefined` or `0`.

\





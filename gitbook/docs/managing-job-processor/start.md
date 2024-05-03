# Start



## `pulse.start()`

{% hint style="info" %}
The `start` method activates the job queue, beginning the regular processing of jobs based on the interval specified in the `processEvery` method. This is a crucial method to call after setting up job intervals and before scheduling any jobs to ensure the job queue operates correctly.
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



### Returns

* **`Promise<void | unknown>`**: A promise that resolves when the database has been set up beforehand and the job processing begins. If the job queue has already been started, the promise resolves with the previously set ready state.

\


### Notes

* **Pre-requisite**: `start` must be called after `processEvery` is set and ideally before scheduling any jobs with methods like `every` or `schedule`.
* **Idempotence**: If `start` is called multiple times, subsequent calls will recognize that processing has already been initiated and will not create additional intervals.


# Now



## `pulse.now(name, data?)`

{% hint style="info" %}
The `now` method schedules a job to be executed immediately. It creates a job instance and schedules it for the current time, allowing for rapid job processing.
{% endhint %}

### Example Usage

```typescript
cconst pulse = new Pulse();

// Schedule a job to run immediately to handle a high priority update
pulse.now('urgentUpdate', { updateDetails: 'Fix critical security issue' })
```



#### Parameters

* **`name`** (`string`): The name of the job to be scheduled. This name should correspond to a job type previously defined with the `define` method.
* **`data`** (`T` - optional): Data to pass to the job for its execution. This can be any type of data that the job requires to perform its tasks.

#### Returns

* **`Promise<Job>`**: A promise that resolves with the created job instance. This job is scheduled to start immediately unless the job queue is currently full or other jobs are already scheduled for the same time.

\





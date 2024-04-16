# Defining Job Processors



## `pulse.define(name, processor, options)`

{% hint style="info" %}
Before you can use a job, you must define its processing behavior.

\
The `define` method is used to configure how specific types of jobs should be handled by the `Pulse` instance. It allows you to specify a job's processing function and its operational parameters, such as concurrency limits, lock behaviors, and execution priority.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

// Define a job type for sending emails
pulse.define('sendEmail', async (job, done) => {
  try {
    await sendEmail(job.data);
    done(); // Mark the job as completed
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}, {
  concurrency: 5,
  lockLimit: 2,
  priority: 'high',
  lockLifetime: 300000, // 5 minutes
  shouldSaveResult: true
});

```



#### Parameters

* **`name`** (`string`): The unique name for the job type. This name is used to refer to and manage jobs of this type throughout their lifecycle.
* **`processor`** (`Processor<T>`): The function that contains the logic to be executed when a job of this type is processed. The function receives a `Job` object and an optional `done` callback that should be called when the job processing completes.
* **`options`** (`DefineOptions` - optional): Configuration options for the job, which include:
  * **`concurrency`** (`number`): Maximum number of instances of the job that can run simultaneously. Defaults to `Pulse`'s `_defaultConcurrency`.
  * **`lockLimit`** (`number`): Maximum number of instances of the job that can be locked at once. Defaults to `Pulse`'s `_defaultLockLimit`.
  * **`lockLifetime`** (`number`): Duration in milliseconds that the job remains locked (i.e., unavailable for re-processing) unless explicitly unlocked sooner. Defaults to `Pulse`'s `_defaultLockLifetime`.
  * **`priority`** (`lowest|low|normal|high|highest|number`): The priority level of the job. Jobs with higher priority are processed first. Defaults to `normal`.
  * **`shouldSaveResult`** (`boolean`): Indicates whether the result of the job processing should be saved. Defaults to `false`.

\


#### Returns

* **`void`**: This method does not return a value.




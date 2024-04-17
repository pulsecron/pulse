# Purge



## `pulse.purge()`

{% hint style="info" %}
The `purge` method is used to clean out the job queue by removing jobs that do not match the currently defined job types. It ensures that the job database does not contain obsolete or irrelevant job records, maintaining the efficiency and accuracy of the job management system.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

pulse.define('emailNotification', async (job) => {
    // Processing logic here
});

pulse.define('dataBackup', async (job) => {
    // Processing logic here
});

// Remove all jobs that are not defined as 'emailNotification' or 'dataBackup'
pulse.purge()
  .then(deletedCount => console.log(`${deletedCount} undefined jobs purged from the system`))
  .catch(error => console.error('Failed to purge jobs:', error));
```



#### Returns

* **`Promise<number | undefined>`**: A promise that resolves with the number of jobs that were deleted from the database. If no jobs were deleted, the promise may resolve to `undefined`.

\





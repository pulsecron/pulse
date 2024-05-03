# Stop



## `pulse.stop()`

{% hint style="info" %}
The `stop` method halts the job processing activity initiated by the `start` method, effectively stopping the job processing interval. Additionally, it includes an operation to unlock any jobs that were locked at the time of stopping, making them available for reprocessing if necessary. This functionality is crucial for ensuring a graceful shutdown of the system, where currently running or grabbed jobs are released. This allows other job queues to pick them up or ensures they are available when the job queue is restarted.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();
pulse.start();

async function graceful() {
  await pulse.stop();
  process.exit(0);
}

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  graceful();
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception thrown', error);
  graceful();
});

```



### Parameters

*

### Returns

* **`Promise<void>`**: A promise that resolves when the job processing interval is cleared and all locked jobs are unlocked. It handles any failures during the unlocking process.

\





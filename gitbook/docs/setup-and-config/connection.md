# Connection

The MongoDB connection can be configured through the `PulseConfig` object, which supports either direct client reuse or new connection parameters.



#### Example Usage

```typescript
const pulseConfig = {
  processEvery: '1 minute',
  maxConcurrency: 10,
  db: {
    address: 'mongodb://localhost:27017/myApp',
    collection: 'jobQueue'
  }
};



const pulse = new Pulse(pulseConfig, (error, collection) => {
  if (error) {
    console.error('Connection error:', error);
  } else {
    console.log('Connected to MongoDB collection:', collection.collectionName);
  }
});
```





### `new Pulse(config?, cb?)`

#### Parameters

* **`config`**
  * **`name`** (`string` - optional): Specifies the name of the job queue. This can be used for identifying and managing different queues within the same application.
  * **`processEvery`** (`string` - optional): Defines how often the job processor should poll for new jobs to process. The string should be a human-readable interval, such as `'5 minutes'`, `'1 hour'`. Defaults to `'5 seconds'` if not specified.
  * **`maxConcurrency`** (`number` - optional): The maximum number of jobs that can be processed concurrently. Helps in controlling resource utilization.
  * **`defaultConcurrency`** (`number` - optional): The default concurrency for jobs that do not specify their own concurrency setting.
  * **`lockLimit`** (`number` - optional): Maximum number of jobs that can be locked at the same time. This prevents a single worker from locking too many jobs.
  * **`defaultLockLimit`** (`number` - optional): Default limit for the number of jobs each worker can lock simultaneously.
  * **`defaultLockLifetime`** (`number` - optional): Duration in milliseconds for how long a job can be locked before it is automatically unlocked. Useful for handling job crashes or stalls. Defaults to 600000 ms (10 minutes).
  * **`sort`** (`any` - optional): Determines the order in which jobs are selected and locked from the database. For example, `{ nextRunAt: 1, priority: -1 }` sorts by `nextRunAt` ascending and `priority` descending.
  * **`mongo`** (`MongoDb` - optional): An existing MongoDB client that can be reused instead of creating a new connection.
  * **`db`** (`object` - optional): Configuration for the MongoDB connection if not using an existing `MongoDb` client. Includes:
    * **`address`** (`string`): The MongoDB connection URI.
    * **`collection`** (`string` - optional): Specifies the MongoDB collection to use. Defaults to `pulseJobs`.
    * **`options`** (`MongoClientOptions` - optional): MongoDB client options.
  * **`disableAutoIndex`** (`boolean` - optional): If set to `true`, automatic indexing of job fields by the `Pulse` system is disabled. Useful for performance tuning in production environments.




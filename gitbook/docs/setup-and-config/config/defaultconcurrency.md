# DefaultConcurrency



## `pulse.defaultConcurrency(concurrency)`

{% hint style="info" %}
The `defaultConcurrency` method sets the default number of jobs that can be processed concurrently by a `Pulse` instance. This setting is crucial for controlling how many jobs are run at the same time, affecting resource utilization and job throughput.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

// Set the default concurrency for job processing to 3
pulse.defaultConcurrency(3);
```



#### Parameters

* **`concurrency`** (`number`): The default number of concurrent jobs that the system should process. This value sets a baseline for job processing unless explicitly overridden by specific jobs.

#### Returns

* **`Pulse`**: Returns the `Pulse` instance, allowing for chaining of additional method calls.




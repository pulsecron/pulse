# MaxConcurrency



## `pulse.maxConcurrency(concurrency)`

{% hint style="info" %}
The `maxConcurrency` method sets the maximum number of jobs that can be processed concurrently across the entire `Pulse` instance, regardless of job type. This global setting is crucial for controlling overall system load and ensuring that job processing does not overwhelm system resources.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

// Set the default concurrency for job processing to 3
pulse.maxConcurrency(10);
```



#### Parameters

* **`concurrency`** (`number`): The maximum number of concurrent jobs allowed. This setting applies to all job types handled by the `Pulse` instance.

#### Returns

* **`Pulse`**: Returns the instance of the `Pulse` class, enabling method chaining.




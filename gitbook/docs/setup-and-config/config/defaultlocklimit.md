# DefaultLockLimit



## `pulse.defaultLockLimit(times)`

{% hint style="info" %}
The `defaultLockLimit` method sets the default number of times jobs of any given type can be locked concurrently. This setting helps to manage the concurrency of job processing more finely by limiting how many instances of the same job type can be prepared for execution at the same time.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

// Set the default concurrency for job processing to 3
pulse.defaultLockLimit(2);
```



### Parameters

* **`times`** (`number`): The maximum number of times jobs of a specific type can be locked concurrently.

### Returns

* **`Pulse`**: Returns the instance of the `Pulse` class, allowing for method chaining.




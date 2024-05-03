# DefaultLockLifetime



## `pulse.defaultLockLifetime(ms)`

{% hint style="info" %}
The `defaultLockLifetime` method sets the default duration (in milliseconds) that a job can remain locked during processing before it is automatically released. This setting helps manage job recovery and ensures that jobs do not remain locked indefinitely if an error occurs or if the job processing is not completed as expected.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

// Set the default lock lifetime to 5 minutes (300000 ms)
pulse.defaultLockLifetime(300000);
```



### Parameters

* **`ms`** (`number`): The duration in milliseconds for how long jobs should be locked by default.
  * default: 600,000ms

### Returns

* **`Pulse`**: Returns the instance of the `Pulse` class, allowing for method chaining.




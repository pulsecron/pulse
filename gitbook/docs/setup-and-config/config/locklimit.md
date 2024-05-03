# LockLimit



## `pulse.lockLimit(limit)`

{% hint style="info" %}
The `lockLimit` method sets the maximum number of jobs that can be locked by the `Pulse` instance at any one time. This is a global setting affecting all job processing, helping to control job concurrency and prevent overload.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

// Set a global lock limit to prevent too many jobs from being locked at the same time
pulse.lockLimit(5);
```



### Parameters

* **`limit`** (`number`): The maximum number of jobs that can be locked simultaneously across the system.

### Returns

* **`Pulse`**: Returns the `Pulse` instance, enabling method chaining.




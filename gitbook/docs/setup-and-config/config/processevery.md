# ProcessEvery



## `pulse.processEvery(interval)`

{% hint style="info" %}
The `name` method of the `Pulse` class allows setting or updating the name of the job queue. This name can be used for identification and management purposes within applications that may handle multiple queues.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

// Configure the job processing interval to every 10 minutes
pulse.processEvery('10 minutes');
```



### Parameters

* **`interval`** (`string`): The interval at which to process jobs, expressed in a human-readable format, such as '5 minutes', '1 hour', etc.

### Returns

* **`Pulse`**: Returns the instance of the `Pulse` class, facilitating method chaining.


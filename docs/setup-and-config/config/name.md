# Name



## `pulse.name(name)`

{% hint style="info" %}
The `name` method of the `Pulse` class allows setting or updating the name of the job queue. This name can be used for identification and management purposes within applications that may handle multiple queues.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();
pulse.name('emailProcessingQueue');
```

#### Parameters

* **`name`** (`string`): The name to assign to the Pulse instance's job queue.

#### Returns

* **`Pulse`**: Returns the instance of the `Pulse` class, allowing for method chaining.

####

# Priority



## `job.priority(priority)`

{% hint style="info" %}
The `priority` method assigns a priority level to a job, determining its processing order relative to other jobs in the queue. This method is crucial for managing execution precedence, especially in systems where certain tasks need urgent handling.

\
_This does **NOT** save the job in the database.  you must explicitly declare_ [_`save()`_](save.md)_if you want to save it_
{% endhint %}

### Example Usage

{% code fullWidth="false" %}
```typescript
const job = pulse.create('test', {});
job.priority('highest');
job.save(); // If you want to save it
```
{% endcode %}

### Parameters

* **`priority`** (`string` | `number`): A priority label (`'lowest'`, `'low'`, `'normal'`, `'high'`, `'highest'`) or a numeric value that corresponds to a predefined priority level.

\


### Returns

* **`Job`**: Returns the job instance, enabling method chaining.

\


\





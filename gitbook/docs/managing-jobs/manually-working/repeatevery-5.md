# SetShouldSaveResult



## `job.setShouldSaveResult(shouldSaveResult)`

{% hint style="info" %}
The `setShouldSaveResult` method sets a flag indicating whether the outcome of the job's execution should be persisted in the database. This option is useful for managing storage and performance by selectively saving results only when necessary.

\
_This does **NOT** save the job in the database.  you must explicitly declare_ [_`save()`_](save.md)_if you want to save it_
{% endhint %}

### Example Usage

{% code fullWidth="false" %}
```typescript
job.setShouldSaveResult(true);
await job.save();
```
{% endcode %}

### Parameters

* **`shouldSaveResult`** (`boolean`): A boolean flag that determines if the job’s result should be saved upon completion. Setting this to `true` enables result persistence, while `false` disables it.

\


### Returns

* **`Job`**: Returns the job instance, allowing for method chaining.

\


\


\





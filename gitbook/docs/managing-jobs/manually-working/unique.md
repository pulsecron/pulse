# Unique



## `job.unique(filter, options?)`

{% hint style="info" %}
The `unique` method configures a job to be unique according to a specified MongoDB query filter. This method is crucial for avoiding duplicate job entries in scenarios where job uniqueness is determined by specific data attributes.\
\
_This does **NOT** save the job in the database.  you must explicitly declare_ [_`save()`_](#user-content-fn-1)[^1]_if you want to save it_
{% endhint %}

### Example Usage

{% code fullWidth="false" %}
```typescript
job.unique({ 'data.type': 'email', 'data.userId': '12345' });
await job.save(); // If you want to save it
```
{% endcode %}

#### Parameters

* **`filter`** (`Filter<TSchema>`): A MongoDB filter object that defines the criteria for job uniqueness. This filter is used to check existing jobs in the database to ensure that no other job with the same attributes exists.
* **`options`** (`{ insertOnly: boolean }` - optional): Additional options to control the uniqueness check. The `insertOnly` option, if set to `true`, ensures that the uniqueness check is only applied when the job is first created, not on subsequent updates.

#### Returns

* **`Job`**: Returns the job instance with the uniqueness criteria applied. This allows for method chaining.

\






[^1]: 

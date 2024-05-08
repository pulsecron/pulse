# Schedule



## `job.schedule(time)`

{% hint style="info" %}
The `schedule` method sets a job to run at a specific time determined by the input parameter. This method accepts both `Date` objects and date strings, providing flexibility in scheduling jobs.\
\


_This does **NOT** save the job in the database.  you must explicitly declare_ [_`save()`_](save.md)_if you want to save it_
{% endhint %}

### Example Usage

{% code fullWidth="false" %}
```typescript
job.schedule(new Date(2023, 11, 17, 10, 30));  
await job.save(); // If you want to save it

```
{% endcode %}

### Parameters

* **`time`** (`string | Date`): The time at which the job is scheduled to run. This can be a `Date` object representing the exact time for the job to run.

\


### Returns

* **`Job`**: Returns the job instance with the updated `nextRunAt` attribute, allowing for method chaining.

\





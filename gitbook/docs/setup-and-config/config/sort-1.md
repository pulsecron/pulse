# ResumeOnRestart



## `pulse.resumeOnRestart(resume)`

{% hint style="info" %}
The `resumeOnRestart` method sets a flag to ensure that jobs are resumed if the system restarts. This is particularly important for resuming unfinished jobs that were in progress or awaiting execution prior to the restart.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

pulse.resumeOnRestart(true) // or pulse.resumeOnRestart()

//or new Pulse({ resumeOnRestart: true });
```



### Parameters

* **`resume`** (`boolean` - optional): If `true`, enables resuming unfinished jobs after restart. Defaults to `true`.

### Returns

* **`Pulse`**: Returns the instance of the `Pulse` class, enabling method chaining.




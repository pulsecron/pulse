# Create



## `pulse.create(name, data)`

{% hint style="info" %}
The `create` method generates a new job instance based on a specified job type and data. It is a preliminary step in the job lifecycle, allowing for the customization of job parameters before the job is scheduled and executed.\
\
_This does **NOT** save the job in the database.  you must explicitly declare_ [_`save()`_](#user-content-fn-1)[^1]_if you want to save it_
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

// Create a new job for data analysis
const analysisJob = pulse.create('dataAnalysis', { datasetId: 101 });
analysisJob.save() //If you want to save it
```



#### Parameters

* **`name`** (`string`): The name of the job to be created. This name should correspond to a job type previously defined with the `define` method, which dictates certain default settings such as priority and result-saving behavior.
* **`data`** (`T`): Data to pass to the job for its execution. This data is used within the job's processing logic and can be any type of data that the job requires.

#### Returns

* **`Job<T extends JobAttributesData>`**: Returns a new `Job` instance configured with the provided name and data.

\






[^1]: 

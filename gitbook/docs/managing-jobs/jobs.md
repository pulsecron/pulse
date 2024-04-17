# Jobs



## `pulse.jobs(query, sort, limit, skip)`

{% hint style="info" %}
The `jobs` method queries the MongoDB database to retrieve an array of jobs that match a specified filter. It supports sorting, limiting the number of results, and skipping a specified number of records, making it a versatile tool for job management and monitoring.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

// Fetch the first 10 completed jobs, skipping the first 5, sorted by creation date
pulse.jobs({ status: 'completed' }, { createdAt: -1 }, 10, 5)
  .then(jobs => {
    console.log('Retrieved completed jobs:', jobs);
  })
  .catch(error => {
    console.error('Error fetching jobs:', error);
  });
```



#### Parameters

* **`query`** (`Filter<any>` - optional): A MongoDB filter object used to specify which jobs to retrieve. If no query is provided, all jobs in the database will be considered.
* **`sort`** (`Sort | string` - optional): A MongoDB sort object that specifies the order in which to return the jobs. If no sort is specified, jobs will be returned in their natural order.
* **`limit`** (`number` - optional): The maximum number of jobs to return. If not specified, or if specified as `0`, no limit will be applied.
* **`skip`** (`number` - optional): The number of jobs to skip before starting to return the results. This can be used for pagination.

#### Returns

* **`Promise<Job[]>`**: A promise that resolves to an array of `Job` objects that match the query and adhere to the specified sorting and pagination settings.

\





# Sort



## `pulse.sort(query)`

{% hint style="info" %}
The `sort` method customizes the sorting order of jobs when querying the MongoDB database. This order can significantly affect the efficiency and priority with which jobs are processed.
{% endhint %}

### Example Usage

```typescript
const pulse = new Pulse();

// Set a custom sort order for job processing
pulse.sort({ createdAt: -1 });

//or new Pulse({ sort: { createdAt: -1 } });
```



### Parameters

* **`query`** (`object`): A MongoDB sort query object that specifies how to order the jobs. For example, `{ nextRunAt: 1, priority: -1 }` will sort jobs primarily by their next scheduled run time in ascending order and by priority in descending order if there are ties.

### Returns

* **`Pulse`**: Returns the instance of the `Pulse` class, enabling method chaining.




# Remove



## `job.remove()`

{% hint style="info" %}
The `remove` method deletes a specific job from the MongoDB database, ensuring that it is no longer available for processing or querying. This method is crucial for managing job lifecycle and maintaining a clean job queue.


{% endhint %}

### Example Usage

{% code fullWidth="false" %}
```typescript
job.remove();
```
{% endcode %}

### Parameters

\


### Returns

* **`Promise<number | undefined>`**: A promise that resolves with the number of documents removed from the database. If no document is found with the specified job ID, it may resolve to `undefined`.

\


\





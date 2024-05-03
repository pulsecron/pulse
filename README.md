<p align="center">
  <img src="./pulse.png" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">PULSE</h1>
</p>
<p align="center">
    <em>The modern MongoDB-powered scheduling library for Node.js</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/pulsecron/pulse?style=default&logo=opensourceinitiative&logoColor=white&color=24E0A4" alt="license">
	<img src="https://img.shields.io/github/last-commit/pulsecron/pulse?style=default&logo=git&logoColor=white&color=24E0A4" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/pulsecron/pulse?style=default&color=24E0A4" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/pulsecron/pulse?style=default&color=24E0A4" alt="repo-language-count">
<p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>

<br><!-- TABLE OF CONTENTS -->

<p align="center">
  <a href="https://docs-pulse.pulsecron.com">Documentation</a> | <a href="https://www.pulsecron.com">Website</a>
</p>
<details>
  <summary>Table of Contents</summary><br>

- [Overview](#overview)
    - [Related Projects](#related-projects)
- [Features](#features)
- [Repository Structure](#repository-structure)
- [Modules](#modules)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Example](#example)
- [Project Roadmap](#project-roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
</details>
<hr>

##  Overview

Pulse is a new fork of the [Agenda](https://github.com/agenda/agenda) project, created as the original project is no longer actively maintained. Positioned as a vital solution in the Node.js ecosystem for job scheduling, the hiatus of Agenda prompted the creation of Pulse. Utilizing MongoDB, Pulse introduces advanced functionalities, improved scalability, and contemporary features to address today’s complex scheduling challenges.

<br/>

#### Related Projects
- [pulsecron](https://www.pulsecron.com) - Event-driven task scheduling management infrastructure
- [nestjs-pulse](https://github.com/pulsecron/nestjs-pulse) - official NestJS module for Pulse.

---

<br/>
<br/>


##  Features

- **High Scalability**: Designed to efficiently manage large-scale job processing.
- **Modern Architecture**: Employs the latest Node.js features and best practices for superior performance.
- **Flexible Scheduling**: Offers support for cron, one-time, and recurring jobs with fine-tuned control.
- **Seamless Integration**: Easily integrates with existing Node.js applications and MongoDB setups.
- **Extensive Documentation**: Provides detailed guides and examples for a quick and easy start.

---
<br/>
<br/>

##  Repository Structure

```sh
└── pulse/
    ├── LICENSE
    ├── README.md
    ├── es.js
    ├── examples
    │   └── concurrency.ts
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── cjs.ts
    │   ├── index.ts
    │   ├── job
    │   ├── pulse
    │   └── utils
    ├── tsconfig.eslint.json
    └── tsconfig.json
```

---
<br/>
<br/>

##  Modules

<details closed><summary>src.pulse</summary>

| File                                                                                                            | Summary                                                                                                                                                                                                                                                                                                                       |
| ---                                                                                                             | ---                                                                                                                                                                                                                                                                                                                           |
| [has-mongo-protocol.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/has-mongo-protocol.ts)         | HasMongoProtocol establishes a function that evaluates if a given URL string contains a valid MongoDB connection protocol, contributing to the repositorys ability to handle and verify database connections.                                                                                                                 |
| [default-concurrency.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/default-concurrency.ts)       | Sets the default concurrency for each job within the Pulse open-source project by modifying the internal state. It contributes to the task scheduling and management functionalities in the project.                                                                                                                          |
| [name.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/name.ts)                                     | Sets the name of a queue within the Pulse object in the parent repositorys architecture. It utilizes debugging for traceability and maintains the flow architecture by returning the Pulse instance after the name assignment.                                                                                                |
| [drain.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/drain.ts)                                   | Drain.ts serves a crucial role in the Pulse module, enabling the cancellation of ongoing job processes. It ensures that all running jobs get completed before terminating the processing interval, promoting an efficient and orderly execution flow in the application.                                                      |
| [enable.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/enable.ts)                                 | Enables specific jobs within the Pulse module by toggling the disabled flag to false. Utilizes MongoDB queries to precisely select matching jobs, aspiring to enhance the flexibility and robustness of job execution. Returns the count of jobs successfully enabled, aiding in operational tracking.                        |
| [schedule.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/schedule.ts)                             | Schedule.ts within the Pulse directory facilitates job scheduling for specific timings. Through this module, users can assign an array of job names to be executed at a specified time, along with associated data. Multiple jobs can be created at once, enhancing the efficiency of task management in the repository.      |
| [default-lock-lifetime.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/default-lock-lifetime.ts)   | Establishes the default lock lifetime in a Pulse application. It allows setting the default lock time in milliseconds, providing flexibility in managing task execution timelines. This is a critical feature for handling concurrency control in Pulses job processing system.                                               |
| [db-init.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/db-init.ts)                               | Establishes and initializes the database collection for job management in the Pulse open-source project. It also includes optional index creation functionality, providing efficient job searching within the database. Notifiers for success or errors make the process transparent and manageable.                          |
| [process-every.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/process-every.ts)                   | ProcessEvery sets a default interval for a Pulse objects processing time. It leverages human-readable time intervals to determine the frequency of certain operations within the pulse directory of the repository. This function returns the updated Pulse object.                                                           |
| [disable.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/disable.ts)                               | Disables selected jobs in the Pulse application by applying a MongoDB filter query. The function returns the number of successfully disabled job instances, providing enhanced control over task execution.                                                                                                                   |
| [jobs.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/jobs.ts)                                     | Within the Pulse repository, the jobs.ts script from the src/pulse directory performs a crucial task. It retrieves all jobs matching a certain query from a MongoDB collection, with options for sorting, limiting and skipping results, transforming these into job objects before returning.                                |
| [start.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/start.ts)                                   | Start.ts initializes job processing for the Pulse module. It validates system readiness before periodically processing tasks using the processJobs method from the utils directory. The method ensures job execution regularity and guarantees uninterrupted operation, provided a database is set beforehand.                |
| [every.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/every.ts)                                   | Within the pulse directory, every.ts establishes a regular job execution framework. It enables job scheduling at specified intervals, handling singular and multiple job names. Pertinent debugging information for scheduled job processes is also provided by this module.                                                  |
| [max-concurrency.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/max-concurrency.ts)               | MaxConcurrency controls job execution in the Pulse system by globally setting the maximum concurrency value, thereby optimizing task management. It directly interacts with the core Pulse framework, ensuring that job execution does not exceed the defined threshold, enhancing overall process efficiency.                |
| [purge.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/purge.ts)                                   | Purge.ts, within the pulse subdirectory, provides functionality to remove all jobs from the queue in the Pulse application. It exports an asynchronous function that cancels undefined jobs, ensuring only defined jobs remain. The function's outcome is confirmed with success or failure notifications.                    |
| [now.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/now.ts)                                       | Establishes a function within the Pulse module, designed to create a job task instantly. This function, named now, accepts job details, schedules it for the current time, saves the job into the system, and handles potential creation errors.                                                                              |
| [default-lock-limit.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/default-lock-limit.ts)         | Defines the maximum number of locks per job type in the Pulse system. It establishes a default limit, with each instance adjustable per user needs. The limit optimizes concurrent task handling, enhancing overall application performance.                                                                                  |
| [stop.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/stop.ts)                                     | Stop.ts within the Pulse sub-directory is responsible for terminating the process of job execution. It achieves this by unlocking jobs that were locked for processing, allowing them to be re-run or accessed, and by clearing the job execution interval, effectively stopping further job processing.                      |
| [database.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/database.ts)                             | Database.ts, located in the src/pulse directory, establishes a connection to a specified MongoDB server. It features the flexibility to use an existing MongoDB connection, customize collection names, and handle connection errors. Ultimately, this file integrates MongoDB into the broader Pulse architecture.           |
| [sort.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/sort.ts)                                     | Sort.ts orchestrates the sorting functionality within the Pulse component, allowing users to customize their queries for job searches. It primarily manages the rules for prioritizing and scheduling jobs, with the default being jobs sorted by their next run time and priority.                                           |
| [mongo.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/mongo.ts)                                   | Mongo.ts integrates MongoDB with the Pulse application, enabling the establishment of database connections. It provides a method to inject MongoClient instance, specify the collection, and handle database initialization errors through callbacks.                                                                         |
| [cancel.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/cancel.ts)                                 | Cancel.ts facilitates the termination of specific Pulse jobs based on a provided MongoDB query, effectively removing them from the database. These cancellations can be initiated by the client code, the Pulse.purge() function, or the Job.remove() function.                                                               |
| [index.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/index.ts)                                   | Pulse, the heart of the repository, manages a queue of jobs in a MongoDB collection. This task scheduling system facilitates job creation, scheduling, locking, and execution, handling concurrency defaults, lock limits, and durations. Moreover, it supports optional configuration and customization parameters.          |
| [define.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/define.ts)                                 | Defines job parameters and execution procedures in the Pulse library. Users can configure concurrency, locking, priority, lifetime, and result persistence for a named job. Job definitions are stored and debugged for future execution within the Pulse system.                                                             |
| [create.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/create.ts)                                 | Creates new jobs within the Pulse module of the repository. This piece of code initializes these jobs with given names and data, also setting specific attributes such as priority and whether to save results based on predefined definitions.                                                                               |
| [find-and-lock-next-job.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/find-and-lock-next-job.ts) | Unlocks and processes queued jobs within the Pulse repository. In the find-and-lock-next-job file, the function identifies a specific job based on its name, locks it for execution, and returns the job status. This operation ensures efficient management of tasks within the system.                                      |
| [job-processing-queue.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/job-processing-queue.ts)     | JobProcessingQueue, as part of the larger Pulse repository, manages job processing through an internal queue. It offers capabilities like job insertion in a specific order, popping jobs without concurrency checks, and identifying the next job eligible for processing whose execution isnt blocked by concurrency.       |
| [lock-limit.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/lock-limit.ts)                         | LockLimit sets a global upper limit on the number of jobs that can be simultaneously locked within the Pulse system, ensuring efficient task execution without resource overstretching. Its essential for maintaining concurrency control in the broader repository architecture.                                             |
| [close.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/close.ts)                                   | Pulse/close.ts secures the main functionality of closing database connections within the Pulse project. It incorporates a provision for forcefully closing connections and handles exceptions that might arise during this process. The feature is specifically adapted for MongoDB databases that havent been preconfigured. |
| [save-job.ts](https://github.com/pulsecron/pulse/blob/master/src/pulse/save-job.ts)                             | <code>► INSERT-TEXT-HERE</code>                                                                                                                                                                                                                                                                                               |

</details>

<details closed><summary>src.utils</summary>

| File                                                                                            | Summary                                                                                                                                                                                                                                                                      |
| ---                                                                                             | ---                                                                                                                                                                                                                                                                          |
| [parse-priority.ts](https://github.com/pulsecron/pulse/blob/master/src/utils/parse-priority.ts) | ParsePriority, situated in the src/utils folder, transforms the priority of jobs from a textual format to a numerical representation. This allows the Pulse system within the repository to handle job scheduling based on priority levels, improving task queue management. |
| [process-jobs.ts](https://github.com/pulsecron/pulse/blob/master/src/utils/process-jobs.ts)     | <code>► INSERT-TEXT-HERE</code>                                                                                                                                                                                                                                              |
| [create-job.ts](https://github.com/pulsecron/pulse/blob/master/src/utils/create-job.ts)         | CreateJob function, residing in src/utils/create-job.ts, orchestrates the generation of Job objects within the Pulse application. It complements the parent repositorys architecture by leveraging the Pulse instance and supplied job data to construct and return a Job.   |
| [index.ts](https://github.com/pulsecron/pulse/blob/master/src/utils/index.ts)                   | Facilitates job creation, priority parsing, and job processing, serving as a utility hub within the pulse repository. It critically interlinks these utility functions to streamline task organization and execution, enhancing the repository's overall functionality.      |

</details>

<details closed><summary>src.job</summary>

| File                                                                                                      | Summary                                                                                                                                                                                                                                                                                                                    |
| ---                                                                                                       | ---                                                                                                                                                                                                                                                                                                                        |
| [enable.ts](https://github.com/pulsecron/pulse/blob/master/src/job/enable.ts)                             | Enable.ts activates a specific job type within the pulse project. By modifying an attribute in the Job object, it reverses the disabled status, allowing the job to run. This function integrates seamlessly with the wider repository structure, particularly the job module.                                             |
| [is-running.ts](https://github.com/pulsecron/pulse/blob/master/src/job/is-running.ts)                     | Defines a function that determines if specific jobs within the application are currently running. It uses time comparisons, analyzing lastRunAt and lastFinishedAt properties, to deliver its verdict, thereby enhancing task management in the parent repository pulse.                                                   |
| [schedule.ts](https://github.com/pulsecron/pulse/blob/master/src/job/schedule.ts)                         | Schedule.ts in the job directory empowers a certain task to run at a predefined time. Using this feature, users can set either a specific date or a string pattern to determine the next execution instance of a job, thereby enhancing the scheduling capabilities in the overall Pulse project.                          |
| [touch.ts](https://github.com/pulsecron/pulse/blob/master/src/job/touch.ts)                               | Touch.ts within the job directory of the Pulse repository manages job concurrency. It updates a jobs lockedAt time, preventing multiple instances from running simultaneously. The function returns a Promise for the saved job.                                                                                           |
| [compute-next-run-at.ts](https://github.com/pulsecron/pulse/blob/master/src/job/compute-next-run-at.ts)   | <code>► INSERT-TEXT-HERE</code>                                                                                                                                                                                                                                                                                            |
| [to-json.ts](https://github.com/pulsecron/pulse/blob/master/src/job/to-json.ts)                           | Transforms job details into a storable JSON object within the repositorys job management module. Converts key date attributes into the Date data type, facilitating data interchange with MongoDB.                                                                                                                         |
| [repeat-at.ts](https://github.com/pulsecron/pulse/blob/master/src/job/repeat-at.ts)                       | RepeatAt is a functionality of the Job module that arranges a task repetition at a specific interval. It accepts human-readable or numeric time variables, thereby empowering developers to schedule tasks dynamically within the pulse project.                                                                           |
| [set-shouldsaveresult.ts](https://github.com/pulsecron/pulse/blob/master/src/job/set-shouldsaveresult.ts) | SetShouldSaveResult in the Job directory enables the persistence of a jobs return value by managing the relevant flag. It forms part of the repositorys core functionality, influencing how job results are stored and retrieved within the pulse system.                                                                  |
| [disable.ts](https://github.com/pulsecron/pulse/blob/master/src/job/disable.ts)                           | Acting as a crucial component in the pulse repository, src/job/disable.ts provides the functionality to prevent specific jobs from running within the software system by modifying the job attributes. The solution enhances system control and ensures efficient resource allocation.                                     |
| [fail.ts](https://github.com/pulsecron/pulse/blob/master/src/job/fail.ts)                                 | Fail within the job directory of the Pulse repository ensures efficient error handling by marking a job as failed. It records the failure reason, increments the failure count, timestamps it, and debugs the number of times a job has failed, thereby improving transparency and traceability.                           |
| [priority.ts](https://github.com/pulsecron/pulse/blob/master/src/job/priority.ts)                         | In the context of the Pulse repository, priority.ts facilitates adjustment of task prioritization within the job queue. It leverages a method to parse and set job priority based on provided parameters, thereby influencing the order of job execution.                                                                  |
| [remove.ts](https://github.com/pulsecron/pulse/blob/master/src/job/remove.ts)                             | In the context of the Pulse repository, remove.ts distresses a crucial function within the Job module. It facilitates the removal of a job from MongoDB by cancelling the job identified by its unique _id attribute.                                                                                                      |
| [unique.ts](https://github.com/pulsecron/pulse/blob/master/src/job/unique.ts)                             | Within the broader Pulse repository, the unique.ts file fundamentally manages the uniqueness of a job. It contains a function that allows the creation of unique jobs by adding specific unique attributes and options to the job data.                                                                                    |
| [index.ts](https://github.com/pulsecron/pulse/blob/master/src/job/index.ts)                               | <code>► INSERT-TEXT-HERE</code>                                                                                                                                                                                                                                                                                            |
| [repeat-every.ts](https://github.com/pulsecron/pulse/blob/master/src/job/repeat-every.ts)                 | RepeatEvery, located within the job directory, enables task scheduling at regular intervals. It includes versatile options such as setting start dates, end dates, skipping specific days, and handling immediate execution scenarios, contributing significantly to the parent repository's task management capabilities. |
| [run.ts](https://github.com/pulsecron/pulse/blob/master/src/job/run.ts)                                   | <code>► INSERT-TEXT-HERE</code>                                                                                                                                                                                                                                                                                            |
| [save.ts](https://github.com/pulsecron/pulse/blob/master/src/job/save.ts)                                 | Save.ts facilitates the persistence of job instances into MongoDB. Working within the job subdirectory of the pulse project, it enables asynchronous saving operations, either successfully storing a job or returning errors.                                                                                             |

</details>

---
<br/>
<br/>

##  Getting Started
| Take a look at our [Quick Start](https://docs-pulse.pulsecron.com/quick-start) guide.

####  Installation

 ```console
 $ npm install --save @pulsecron/pulse
```



####  Example

```typescript
import Pulse from '@pulsecron/pulse';

const mongoConnectionString = 'mongodb://localhost:27017/pulse';

const pulse = new Pulse({
  db: { address: mongoConnectionString },
  defaultConcurrency: 4,
  maxConcurrency: 4,
  processEvery: '10 seconds',
  resumeOnRestart: true,
});

// Or override the default collection name:
// const pulse = new Pulse({db: {address: mongoConnectionString, collection: 'jobCollectionName'}});

// or pass additional connection options:
// const pulse = new Pulse({db: {address: mongoConnectionString, collection: 'jobCollectionName', options: {ssl: true}}});

// or pass in an existing mongodb-native MongoClient instance
// const pulse = new Pulse({mongo: myMongoClient});

/**
 * Example of defining a job
 */
pulse.define('delete old users', async (job) => {
  console.log('Deleting old users...');
  return;
});

/**
 * Example of repeating a job
 */
(async function () {
  // IIFE to give access to async/await
  await pulse.start();

  await pulse.every('3 minutes', 'delete old users');

  // Alternatively, you could also do:
  await pulse.every('*/3 * * * *', 'delete old users');
})();

/**
 * Example of defining a job with options
 */
pulse.define(
  'send email report',
  async (job) => {
    const { to } = job.attrs.data;

    console.log(`Sending email report to ${to}`);
  },
  { lockLifetime: 5 * 1000, priority: 'high', concurrency: 10 }
);

/**
 * Example of scheduling a job
 */
(async function () {
  await pulse.start();
  await pulse.schedule('in 20 minutes', 'send email report', { to: 'admin@example.com' });
})();

/**
 * Example of repeating a job
 */
(async function () {
  const weeklyReport = pulse.create('send email report', { to: 'example@example.com' });
  await pulse.start();
  await weeklyReport.repeatEvery('1 week').save();
})();

/**
 * Check job start and completion/failure
 */
pulse.on('start', (job) => {
  console.log(time(), `Job <${job.attrs.name}> starting`);
});
pulse.on('success', (job) => {
  console.log(time(), `Job <${job.attrs.name}> succeeded`);
});
pulse.on('fail', (error, job) => {
  console.log(time(), `Job <${job.attrs.name}> failed:`, error);
});

function time() {
  return new Date().toTimeString().split(' ')[0];
}


```


---
<br/>
<br/>

##  Project Roadmap

- [X] **Add Support for Latest Mongoose Version(8.x.x)**: Upgrade Pulse to be fully compatible with the latest version of Mongoose. This will enable Pulse to leverage the newest features and improvements in Mongoose, ensuring better performance, stability, and security for applications that rely on MongoDB through Mongoose.
- [ ] **Refactoring to Modern TypeScript Syntax**: Undertake a comprehensive refactor of the codebase to utilize modern TypeScript features and syntax. This refactoring will improve code readability, maintainability, and make it easier for new contributors to understand and contribute to the project.
- [ ] **Resolving Issues in Existing Agenda Projects**: Actively address and resolve outstanding issues within the original Agenda project. This initiative not only aids the community by improving the legacy codebase but also informs the development of Pulse by identifying and addressing past challenges.
- [ ] **Rewrite Test Code**: Revamp our testing suite to increase coverage and ensure tests are up-to-date with modern testing practices. This rewrite aims to enhance test reliability and efficiency, facilitating smoother development and deployment cycles.
- [ ] **Rewrite Documentation**: Completely revise and update the documentation to reflect all new changes and features, ensure clarity of information, and improve navigation and readability for developers. This effort will include new getting started guides, API documentation, and use case examples to facilitate easier adoption and implementation by users.
---
<br/>
<br/>

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/pulsecron/pulse/issues)**: Submit bugs found or log feature requests for the `pulse` project.
- **[Submit Pull Requests](https://github.com/pulsecron/pulse/pulls)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/pulsecron/pulse/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/pulsecron/pulse
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="center">
   <a href="https://github.com{/pulsecron/pulse/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=pulsecron/pulse">
   </a>
</p>
</details>

---
<br/>
<br/>

##  License

This project is protected under the [MIT](https://github.com/pulsecron/pulse?tab=MIT-1-ov-file#readme) License. For more details, refer to the [LICENSE](https://github.com/pulsecron/pulse?tab=MIT-1-ov-file#readme) file.

---
<br/>
<br/>


##  Acknowledgments
- Pulse was forked from [Agenda](https://github.com/agenda/agenda) by [@pulsecron](https://github.com/pulsecron).

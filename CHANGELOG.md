# CHANGELOG

## [1.6.1](https://github.com/pulsecron/pulse/compare/v1.6.0...v1.6.1) (2024-07-15)


### 🐛 BUG FIXES

* import path for JobError in touch.ts ([a7efab5](https://github.com/pulsecron/pulse/commit/a7efab5455833dc4d7cc9601ed9e62fa90f08d92))

## [1.6.0](https://github.com/pulsecron/pulse/compare/v1.5.2...v1.6.0) (2024-07-15)


### 🚀 FEATURES

*  progress value to touch functio ([761d584](https://github.com/pulsecron/pulse/commit/761d58451aaf72a7234eb8e0872ccef63a3f2360))

## [1.5.2](https://github.com/pulsecron/pulse/compare/v1.5.1...v1.5.2) (2024-06-29)


### 🐛 BUG FIXES

* import Document interface in unique.ts ([811044d](https://github.com/pulsecron/pulse/commit/811044d2cebd18b0300e8c876c2face70528bcff))

## [1.5.1](https://github.com/pulsecron/pulse/compare/v1.5.0...v1.5.1) (2024-06-01)


### 🐛 BUG FIXES

* Added missing template types for returned s in the  method. ([8011bd3](https://github.com/pulsecron/pulse/commit/8011bd3d7449876a60a5df5b26db7f907098a2fe))

## [1.5.0](https://github.com/pulsecron/pulse/compare/v1.4.4...v1.5.0) (2024-05-21)


### 🚀 FEATURES

* add countJobs method to Pulse class ([fdd000e](https://github.com/pulsecron/pulse/commit/fdd000ec94c2c07ff8ee68f8e5d0e0d50787d2c3))

## [1.4.4](https://github.com/pulsecron/pulse/compare/v1.4.3...v1.4.4) (2024-05-19)


### ♻️ REFACTOR

* code to improve readability and maintainability ([#34](https://github.com/pulsecron/pulse/issues/34)) ([7e9070c](https://github.com/pulsecron/pulse/commit/7e9070c82ee470b73ba5640b350663b7ad44d39d))

## [1.4.3](https://github.com/pulsecron/pulse/compare/v1.4.2...v1.4.3) (2024-05-08)


### 🐛 BUG FIXES

* fix import path in pulse/every.ts ([ac45fd0](https://github.com/pulsecron/pulse/commit/ac45fd0e1a022b29a69d00f978aeaea426039d80))

## [1.4.2](https://github.com/pulsecron/pulse/compare/v1.4.1...v1.4.2) (2024-05-08)


### ♻️ REFACTOR

* refactor every.ts to improve job creation and error handling ([a860df4](https://github.com/pulsecron/pulse/commit/a860df4f5d18dae8b279528ed18db50d80c61ce2))

## [1.4.1](https://github.com/pulsecron/pulse/compare/v1.4.0...v1.4.1) (2024-05-05)


### ♻️ REFACTOR

* fail method improve logging ([81d96f3](https://github.com/pulsecron/pulse/commit/81d96f39fdcb839b35df2b7359cc622591f9fe2d))

## [1.4.0](https://github.com/pulsecron/pulse/compare/v1.3.0...v1.4.0) (2024-05-05)


### 🚀 FEATURES

* add attempts and backoff options for failling job ([#27](https://github.com/pulsecron/pulse/issues/27)) ([120adf5](https://github.com/pulsecron/pulse/commit/120adf58b2647f107a656fc8168a654d7877e496))

## [1.3.0](https://github.com/pulsecron/pulse/compare/v1.2.1...v1.3.0) (2024-05-04)


### 🚀 FEATURES

* add resumeOnRestart option to PulseConfig ([#25](https://github.com/pulsecron/pulse/issues/25)) ([0e53e12](https://github.com/pulsecron/pulse/commit/0e53e12f692798d6107afec860893749ed642858))

## [1.2.1](https://github.com/pulsecron/pulse/compare/v1.2.0...v1.2.1) (2024-05-03)


### 🐛 BUG FIXES

* add BaseError and JobError classes to handle custom errors ([b2f7092](https://github.com/pulsecron/pulse/commit/b2f7092adccd154c314bb1e7650cbc02c1862e81))

## [1.2.0](https://github.com/pulsecron/pulse/compare/v1.1.12...v1.2.0) (2024-05-02)


### 🚀 FEATURES

* add fetchStatus method to Job class ([e5e904e](https://github.com/pulsecron/pulse/commit/e5e904e0769808dc19b38d76623e8f63b17ac110))
* add getJobsRepo method to Pulse class ([27db921](https://github.com/pulsecron/pulse/commit/27db9210a516b4258e0f89e2d00ba4eb5e42ef30))
* add isExpired method to Job class ([973d0b8](https://github.com/pulsecron/pulse/commit/973d0b8c448ad6de5cb61c6438d16ff690f9ef2e))
* emit 'cancel' event with deletedCount in cancel method of Pulse class ([0947655](https://github.com/pulsecron/pulse/commit/0947655ec43179b3a9004a0e4c94a0b19e751c89))
* update isRunning method in Job class to support fetching real status ([5335524](https://github.com/pulsecron/pulse/commit/533552495393943209c1e533a109e3338a11b155))

## [1.1.12](https://github.com/pulsecron/pulse/compare/v1.1.11...v1.1.12) (2024-05-02)


### 🐛 BUG FIXES

* Fixed return type of the CreateMethod ([#21](https://github.com/pulsecron/pulse/issues/21)) ([2b79b7b](https://github.com/pulsecron/pulse/commit/2b79b7b16234aa2c8a39395f16c40c5153c1ddbd))

## [1.1.11](https://github.com/pulsecron/pulse/compare/v1.1.10...v1.1.11) (2024-05-02)


### 🐛 BUG FIXES

* update Processor type definition in define.ts ([#19](https://github.com/pulsecron/pulse/issues/19)) ([7c384ee](https://github.com/pulsecron/pulse/commit/7c384ee16e91fb49dea5617ba21fce43112678a7))

## [1.1.10](https://github.com/pulsecron/pulse/compare/v1.1.9...v1.1.10) (2024-05-02)


### 🐛 BUG FIXES

* return resolve pulse.stop() case of success ([#18](https://github.com/pulsecron/pulse/issues/18)) ([df7e6f4](https://github.com/pulsecron/pulse/commit/df7e6f48c9ca545728689e954505088d36ca3081))

## [1.1.9](https://github.com/pulsecron/pulse/compare/v1.1.8...v1.1.9) (2024-05-02)


### 🐛 BUG FIXES

* jobAttributes interface to use generic type T in data property ([#15](https://github.com/pulsecron/pulse/issues/15)) ([daee70a](https://github.com/pulsecron/pulse/commit/daee70a06acc4bf6679e7592b5f5cde0bb4b74d0))

## [1.1.8](https://github.com/pulsecron/pulse/compare/v1.1.7...v1.1.8) (2024-04-22)


### 🐛 BUG FIXES

* add PulseOnEventType and override on method in Pulse class ([#12](https://github.com/pulsecron/pulse/issues/12)) ([c8849b0](https://github.com/pulsecron/pulse/commit/c8849b0b34e9ca9d0d2c3e00ccbd8222530e09c4))

## [1.1.7](https://github.com/pulsecron/pulse/compare/v1.1.6...v1.1.7) (2024-04-16)


### 🐛 BUG FIXES

* update return type of every method in pulse/every.ts & update database method in Pulse class to be public ([#11](https://github.com/pulsecron/pulse/issues/11)) ([27d660c](https://github.com/pulsecron/pulse/commit/27d660c586364a5b7cdf79577c984fe191bbf6a3))

## [1.1.6](https://github.com/pulsecron/pulse/compare/v1.1.5...v1.1.6) (2024-04-16)


### 🐛 BUG FIXES

* update type job creation methods in pulse/every.ts, pulse/now.ts, and pulse/schedule.ts ([696e4d0](https://github.com/pulsecron/pulse/commit/696e4d0e967acdbf9c6d4a4fc0fe26eb0e078820))

## [1.1.5](https://github.com/pulsecron/pulse/compare/v1.1.4...v1.1.5) (2024-04-15)


### 🐛 BUG FIXES

* add new release configuration for API, job, and pulse scopes ([29ab228](https://github.com/pulsecron/pulse/commit/29ab2289d2adaffad03708be0443b1e057941ff1))

## [1.1.4](https://github.com/pulsecron/pulse/compare/v1.1.3...v1.1.4) (2024-04-15)


### ♻️ REFACTOR

*  refactor JobAttributes interface to use 'any' type for the 'data' property in index.ts ([40ded49](https://github.com/pulsecron/pulse/commit/40ded49ca9dc640a57a04227c4e79608da6d413c))

## [1.1.3](https://github.com/pulsecron/pulse/compare/v1.1.2...v1.1.3) (2024-04-14)


### 🐛 BUG FIXES

* update unique property name to uniqueQuery ([8e44261](https://github.com/pulsecron/pulse/commit/8e44261792dd489927a8528861304c1515b8538d))

## [1.1.2](https://github.com/pulsecron/pulse/compare/v1.1.1...v1.1.2) (2024-04-13)


### 🐛 BUG FIXES

* update package.json and index.ts files ([37f15ae](https://github.com/pulsecron/pulse/commit/37f15aee08613fc9d1cd92c3542e9bee6ca55ebf))

## [1.1.1](https://github.com/pulsecron/pulse/compare/v1.1.0...v1.1.1) (2024-04-12)


### ♻️ REFACTOR

* all functions in Pulse class and Job class ([#9](https://github.com/pulsecron/pulse/issues/9)) ([4fef6dc](https://github.com/pulsecron/pulse/commit/4fef6dc2dbf6c695d3cc722a7a8fb0ab48db3cd1))

## [1.1.0](https://github.com/pulsecron/pulse/compare/v1.0.2...v1.1.0) (2024-04-11)


### 🚀 FEATURES

* define function change from 2nd position to 3rd ([#8](https://github.com/pulsecron/pulse/issues/8)) ([7fc238d](https://github.com/pulsecron/pulse/commit/7fc238d8f839a59e528d25083e478acada06d85c))

## [1.0.2](https://github.com/pulsecron/pulse/compare/v1.0.1...v1.0.2) (2024-04-11)


### 📝 DOCS

* update README.md with installation instructions and example code ([aa01f3b](https://github.com/pulsecron/pulse/commit/aa01f3b9951ebd0c291556f377b8cf53899f7b04))

## [1.0.1](https://github.com/pulsecron/pulse/compare/v1.0.0...v1.0.1) (2024-04-11)


### 🐛 BUG FIXES

* package-lock.json ([2e9384d](https://github.com/pulsecron/pulse/commit/2e9384d3d9247591aa73260e1386f2f513e796f5))
* package-lock.json ([24610ab](https://github.com/pulsecron/pulse/commit/24610abc3bf8c58e579e4ae04cd0f18c81cd35fc))

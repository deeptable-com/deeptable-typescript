# Changelog

## 0.1.0-beta.4 (2026-02-12)

Full Changelog: [v0.1.0-beta.3...v0.1.0-beta.4](https://github.com/deeptable-com/deeptable-typescript/compare/v0.1.0-beta.3...v0.1.0-beta.4)

### Bug Fixes

* **client:** avoid memory leak with abort signals ([1a977e3](https://github.com/deeptable-com/deeptable-typescript/commit/1a977e36385976f7585f8371abdf5d79722d2c08))
* **client:** avoid removing abort listener too early ([e0209c0](https://github.com/deeptable-com/deeptable-typescript/commit/e0209c027bbd6c4b4534f67d906f9ad8d77391c9))


### Chores

* **client:** do not parse responses with empty content-length ([5b717c7](https://github.com/deeptable-com/deeptable-typescript/commit/5b717c71a0f154b25d1076f5c38d92393e709326))
* **client:** restructure abort controller binding ([e9367fa](https://github.com/deeptable-com/deeptable-typescript/commit/e9367fa9e5f0224300737e36994fc3183bb8342a))
* **internal:** avoid type checking errors with ts-reset ([8fab995](https://github.com/deeptable-com/deeptable-typescript/commit/8fab995bb19b8a283a8e0f37a40864152fe5fd84))
* **internal:** fix pagination internals not accepting option promises ([d096d58](https://github.com/deeptable-com/deeptable-typescript/commit/d096d58c4e1b56d3538559c79e5370d98ea38511))
* **internal:** upgrade pnpm ([45ee5fc](https://github.com/deeptable-com/deeptable-typescript/commit/45ee5fc8e58fae5d5d98cab625b9c9965afd7756))

## 0.1.0-beta.3 (2026-01-30)

Full Changelog: [v0.1.0-beta.2...v0.1.0-beta.3](https://github.com/deeptable-com/deeptable-typescript/compare/v0.1.0-beta.2...v0.1.0-beta.3)

### Features

* Add column_sqlite_type and column_parquet_type to ColumnMetadata and enhance metadata tracking ([1c32e14](https://github.com/deeptable-com/deeptable-typescript/commit/1c32e146aac9d77695fb6fadf77e2dc4e3a5b461))

## 0.1.0-beta.2 (2026-01-30)

Full Changelog: [v0.1.0-beta.1...v0.1.0-beta.2](https://github.com/deeptable-com/deeptable-typescript/compare/v0.1.0-beta.1...v0.1.0-beta.2)

### Features

* Add 'metadata' to TableType enum ([9431e55](https://github.com/deeptable-com/deeptable-typescript/commit/9431e5552b0ee71c041816d567bf56aab983b894))

## 0.1.0-beta.1 (2026-01-28)

Full Changelog: [v0.1.0-alpha.4...v0.1.0-beta.1](https://github.com/deeptable-com/deeptable-typescript/compare/v0.1.0-alpha.4...v0.1.0-beta.1)

### Bug Fixes

* documentation inconsistencies ([173c791](https://github.com/deeptable-com/deeptable-typescript/commit/173c7915c6388e001d6f7efe064779fb95d25cd4))

## 0.1.0-alpha.4 (2026-01-27)

Full Changelog: [v0.1.0-alpha.3...v0.1.0-alpha.4](https://github.com/deeptable-com/deeptable-typescript/compare/v0.1.0-alpha.3...v0.1.0-alpha.4)

### Features

* Add seed_bill_snow.py to test.yaml for Bruno E2E tests ([bb0e7df](https://github.com/deeptable-com/deeptable-typescript/commit/bb0e7df795575f65934cb73e82be2114c7bc0835))
* Fix seed.sql to overwrite records on conflict ([3c0a301](https://github.com/deeptable-com/deeptable-typescript/commit/3c0a3013af5ad012136ea459c18df8a035fd84e5))

## 0.1.0-alpha.3 (2026-01-26)

Full Changelog: [v0.1.0-alpha.2...v0.1.0-alpha.3](https://github.com/deeptable-com/deeptable-typescript/compare/v0.1.0-alpha.2...v0.1.0-alpha.3)

### Features

* Make format parameter required in download_table endpoint and improve OpenAPI spec publishing ([5098c51](https://github.com/deeptable-com/deeptable-typescript/commit/5098c51ff82d750971d69cf935144a623173a121))

## 0.1.0-alpha.2 (2026-01-26)

Full Changelog: [v0.1.0-alpha.1...v0.1.0-alpha.2](https://github.com/deeptable-com/deeptable-typescript/compare/v0.1.0-alpha.1...v0.1.0-alpha.2)

### Features

* **api:** add new routes for download_file and change structured-sheets endpoint to replace exports with tables subresource ([89d6e29](https://github.com/deeptable-com/deeptable-typescript/commit/89d6e2979d497fc596fa1c42a817c33a9c158920))
* Setup OpenAPI sync for SDK generation and implement new API routes ([9348a2a](https://github.com/deeptable-com/deeptable-typescript/commit/9348a2a51a4869ce79056075c70fecec412496a4))


### Chores

* update SDK settings ([ea6f2af](https://github.com/deeptable-com/deeptable-typescript/commit/ea6f2af4d5e1aafa5cab75cdfdd9187696fd56ee))

## 0.1.0-alpha.1 (2026-01-23)

Full Changelog: [v0.0.1...v0.1.0-alpha.1](https://github.com/deeptable-com/deeptable-typescript/compare/v0.0.1...v0.1.0-alpha.1)

### Features

* **api:** change casing for DeepTable class ([7b707a0](https://github.com/deeptable-com/deeptable-typescript/commit/7b707a0f3bffa65282fa952416174f6736826e4f))


### Chores

* configure new SDK language ([b2904f1](https://github.com/deeptable-com/deeptable-typescript/commit/b2904f1c9a84ea840cadb7e187be58b18bdc347a))
* update SDK settings ([427a5c6](https://github.com/deeptable-com/deeptable-typescript/commit/427a5c6156151c393c9332a2db7f34a68005ae29))
* update SDK settings ([40caac4](https://github.com/deeptable-com/deeptable-typescript/commit/40caac4eef86f2a367564f9085d89770e8ab7040))

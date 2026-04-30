# Changelog

## 0.1.0-beta.7 (2026-04-30)

Full Changelog: [v0.1.0-beta.6...v0.1.0-beta.7](https://github.com/deeptable-com/deeptable-typescript/compare/v0.1.0-beta.6...v0.1.0-beta.7)

### Features

* support setting headers via env ([8d44a6d](https://github.com/deeptable-com/deeptable-typescript/commit/8d44a6dd8ad8c9c0af7bca2380c587f47259d778))


### Bug Fixes

* **internal:** gitignore generated `oidc` dir ([6be8180](https://github.com/deeptable-com/deeptable-typescript/commit/6be81805d10d56f186ba2dc75c63e080b284a20f))


### Chores

* **format:** run eslint and prettier separately ([4b73131](https://github.com/deeptable-com/deeptable-typescript/commit/4b73131bad43ec71cefffa4ec49c484b34bececa))
* **internal:** codegen related update ([f0d2b8b](https://github.com/deeptable-com/deeptable-typescript/commit/f0d2b8ba1a049635f8413b2c2994288af2ef8878))
* **internal:** codegen related update ([4197dfc](https://github.com/deeptable-com/deeptable-typescript/commit/4197dfce7e7ba80d662def6f8a5de0e1459b0fa2))
* **internal:** more robust bootstrap script ([56bca82](https://github.com/deeptable-com/deeptable-typescript/commit/56bca8266f6743d1a95539f9d710cc7f05b2fe4c))

## 0.1.0-beta.6 (2026-03-25)

Full Changelog: [v0.1.0-beta.5...v0.1.0-beta.6](https://github.com/deeptable-com/deeptable-typescript/compare/v0.1.0-beta.5...v0.1.0-beta.6)

### Chores

* **ci:** skip lint on metadata-only changes ([da8ae51](https://github.com/deeptable-com/deeptable-typescript/commit/da8ae51373ca451b87fef7bff2191023f0eab173))
* **internal:** update gitignore ([de228f9](https://github.com/deeptable-com/deeptable-typescript/commit/de228f9cac4326815aff0388330f543e4dca9e9d))

## 0.1.0-beta.5 (2026-03-19)

Full Changelog: [v0.1.0-beta.4...v0.1.0-beta.5](https://github.com/deeptable-com/deeptable-typescript/compare/v0.1.0-beta.4...v0.1.0-beta.5)

### Chores

* ignore macOS .DS_Store ([d59e460](https://github.com/deeptable-com/deeptable-typescript/commit/d59e460de01fe6e31d72d956b97920fc4517f994))

## 0.1.0-beta.4 (2026-03-17)

Full Changelog: [v0.1.0-beta.3...v0.1.0-beta.4](https://github.com/deeptable-com/deeptable-typescript/compare/v0.1.0-beta.3...v0.1.0-beta.4)

### Bug Fixes

* **client:** avoid memory leak with abort signals ([1a977e3](https://github.com/deeptable-com/deeptable-typescript/commit/1a977e36385976f7585f8371abdf5d79722d2c08))
* **client:** avoid removing abort listener too early ([e0209c0](https://github.com/deeptable-com/deeptable-typescript/commit/e0209c027bbd6c4b4534f67d906f9ad8d77391c9))
* **client:** preserve URL params already embedded in path ([6a5c48b](https://github.com/deeptable-com/deeptable-typescript/commit/6a5c48bcf39e1fc18620b586a392b8222af56e7b))
* **docs/contributing:** correct pnpm link command ([8827776](https://github.com/deeptable-com/deeptable-typescript/commit/882777635aa7bf8992376a93febd05f95f073f42))
* **internal:** skip tests that depend on mock server ([c8c57d7](https://github.com/deeptable-com/deeptable-typescript/commit/c8c57d72d0e5f1a88cf38123f2137846ee5f044e))


### Chores

* **ci:** skip uploading artifacts on stainless-internal branches ([7b63a1c](https://github.com/deeptable-com/deeptable-typescript/commit/7b63a1ca339fbefeb5c660234b0bbd0ef239c190))
* **client:** do not parse responses with empty content-length ([5b717c7](https://github.com/deeptable-com/deeptable-typescript/commit/5b717c71a0f154b25d1076f5c38d92393e709326))
* **client:** restructure abort controller binding ([e9367fa](https://github.com/deeptable-com/deeptable-typescript/commit/e9367fa9e5f0224300737e36994fc3183bb8342a))
* **internal/client:** fix form-urlencoded requests ([cf90bd9](https://github.com/deeptable-com/deeptable-typescript/commit/cf90bd9145cc6735b2ada48b8ea4329f1daa24e0))
* **internal:** avoid type checking errors with ts-reset ([8fab995](https://github.com/deeptable-com/deeptable-typescript/commit/8fab995bb19b8a283a8e0f37a40864152fe5fd84))
* **internal:** codegen related update ([d6a1d09](https://github.com/deeptable-com/deeptable-typescript/commit/d6a1d094ab2367f4b3d0e6543f1085ae1c9fa132))
* **internal:** codegen related update ([44fbaff](https://github.com/deeptable-com/deeptable-typescript/commit/44fbaff0d2d7b0331d152f13896ea376168bd0dd))
* **internal:** fix pagination internals not accepting option promises ([d096d58](https://github.com/deeptable-com/deeptable-typescript/commit/d096d58c4e1b56d3538559c79e5370d98ea38511))
* **internal:** move stringifyQuery implementation to internal function ([66d42ef](https://github.com/deeptable-com/deeptable-typescript/commit/66d42ef05f1d9fe147d52bdbf4db4209200fe2a7))
* **internal:** remove mock server code ([8a79a00](https://github.com/deeptable-com/deeptable-typescript/commit/8a79a00a91c9aa9d05a6fc5815cc9dae7f10b3c6))
* **internal:** tweak CI branches ([2e6bbdd](https://github.com/deeptable-com/deeptable-typescript/commit/2e6bbdd6d1c1bdec78248460d372dd8b03dec1b3))
* **internal:** update dependencies to address dependabot vulnerabilities ([e4fa216](https://github.com/deeptable-com/deeptable-typescript/commit/e4fa21670df2523f6c7b09125361437d171a9650))
* **internal:** upgrade pnpm ([45ee5fc](https://github.com/deeptable-com/deeptable-typescript/commit/45ee5fc8e58fae5d5d98cab625b9c9965afd7756))
* **internal:** upgrade pnpm version ([623349a](https://github.com/deeptable-com/deeptable-typescript/commit/623349a9cbcd36c2760b145a05db2f2c95756e99))
* update mock server docs ([84eb250](https://github.com/deeptable-com/deeptable-typescript/commit/84eb25070eb159640b5bbc6f46e4a2756d63ed03))
* update placeholder string ([5414645](https://github.com/deeptable-com/deeptable-typescript/commit/541464557c68ab984455e653628c9c3f53b7e0c7))

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

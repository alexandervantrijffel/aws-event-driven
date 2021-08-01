# event-driven

Event driven data processing demo

### Getting started

Install serverless globally with `yarn global add serverless serverless-offline`

Install plugins `serverless plugin install --name serverless-localstack`

To run the demo locally, execute the following commands:

```bash
yarn install
SERVICES=s3,dynamodb,kinesis TMPDIR=${TMPDIR:-/tmp} docker-compose up -d
yarn lerna run start
```

Install `awslocal` with:

```bash
pip install awscli-local
```

Run erverless offline with `SLS_DEBUG=* sls offline start --stage dev`

Build function and deploy with `rm .build && sls deploy -s local -v`

Invoke function with `sls invoke local --function provider`

### Example commands for Lerna monorepo

Create ping-pong package

```bash
yarn lerna create @structura/ping-pong
```

Add the latest stable version of typescript to all workspaces

```bash
yarn lerna add typescript@ -E --dev
```

Add dependency package/application-lifecycle to package/ping-pong

```bash
yarn lerna add @grandvision/application-lifecycle --scope=@grandvision/ping-pong
```

Execute all tests that are impacted by the changed compared to origin/master

```bash
yarn lerna run test --concurrency 1 -- --changedSince=origin/master
```

Run yarn install for all workspaces

```bash
yarn install
```

Run yarn upgrade for all workspaces

```bash
yarn lerna exec --concurrency 1 -- yarn upgrade
```

Dry run semantic-release with the semantic-release-monorepo extension

```bash
yarn lerna exec --concurrency 1 -- npx --no-install semantic-release -e semantic-release-monorepo --dry-run
```

Import an existing package into the monorepo including git history

```bash
yarn lerna import ~/projects/my-npm-repo-package-1 — flatten
```

# KraudDonate-Service

KraudDonate-Service is part of the KraudDonate application to help volunteers. <br/>
This is the main part providing the core routing and handling of all of the application's workflows.

## Installation

```
$ npm install
```

## Build db & run container

```
# 1 (only once if you have not built before, otherwise step 2)
$ npm run buildDb 

# 2 Run the database
$ npm run upDb

# 3 Down the database
$ npm run stopDb

# Connect to the database local viewer
host     - localhost
port     - 6532
database - main
username - postgres
password - root
```
## Run migration

```
$ npx prisma migrate dev
```

## Run seed

```
$ npx prisma db seed
```
## Run app

```
$ npm run start
$ npm run start:dev
```
## API endpoints documentation
> http://localhost:4000/api
## Technology

- Node.js & npm
- NestJS
- TypeScript
- PostgreSQL & Prisma ORM

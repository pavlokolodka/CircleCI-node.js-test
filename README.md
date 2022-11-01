# KraudDonate-Service

KraudDonate-Service is part of the KraudDonate application to help volunteers. <br/>
This is the main part providing the core routing and handling of all of the application's workflows.

## Installation

```
$ npm install
```

## Build db & run container

```
$ docker build -t postgresdb_main .
$ docker run -d --name postgresdb_main -p 6532:5432 --rm postgresdb_main
```
## Run migration

```
$ npx prisma migrate dev
```
## Run app

```
$ npm run start
$ npm run start:dev
```

## Technology

- Node.js & npm
- NestJS
- TypeScript
- PostgreSQL & Prisma ORM

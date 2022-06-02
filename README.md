## Description

A simple TODO application
* TypeORM
* Swagger
* JWT And Refresh token

## Installation

```bash
$ mv .env.example .env
$ npm install
$ mkdir ./dist/public/uploads
```
## Migration

```bash
$ npm run typeorm:generate <name>
$ npm run typeorm:run
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Access the app
```bash
# api uri
//localhost:<port>/api/~

# serve static file uri
//localhost:<port>/<folder-public-on-dist>/~
```
# Intro 📖

We here to revolutionize education 🚀 Let's go!

## Install

- Clone repo: `git clone git@github.com:stanmattingly/pumpdotedu.git`
- Install [Docker Desktop](https://docs.docker.com/get-started/get-docker/) on your machine
- Run `npm install` to install npm packages for root used for precommit
- Run `make` in parent directory

## Make Commands

```sh
# build and migrate
make

# build
make up

# tear down
make down

# tear down and remove volumes
make down-v

# when adding schemas
make migrate

# rebuild database
make reset

# creates a migration file
make migration
```

## Services

### Frontend

- Built with React
- [View](http://localhost:3000/)

### Backend

- Built with Express
- [API](http://localhost:8000/)
- [Webhooks](http://localhost:8050/)

### Database

- [Postgres](http://localhost:5432/)

### Storage

- [S3](http://localhost:5432/)

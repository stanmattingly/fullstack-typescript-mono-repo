# Fullstack TypeScript Monorepo

An immediately runnable fullstack TypeScript application using React, Express, PostgreSQL, and AWS services (via LocalStack). This project is designed to provide a modern monorepo setup with seamless developer experience and pre-configured services to kickstart development.

## Features

- **Frontend**: React application running on `localhost:3000`.
- **Backend**: Express application running on `localhost:8000`.
- **Database**: PostgreSQL with pre-configured development database.
- **Knex**: Uses Knex for migrations and db interactions.
- **AWS Services**: LocalStack setup for S3 and SQS and anything else!
- **Monorepo Setup**: Shared codebase and workspace-ready structure.
- **Dockerized Development**: Fully containerized environment for easy setup and isolation.
- **Makefile Commands**: Simplified project management with pre-defined tasks for setup, migrations, and more.

## Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/) (if running scripts outside of containers)
- [Make](https://www.gnu.org/software/make/) (optional but recommended for using the Makefile)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/fullstack-typescript-mono-repo.git
cd fullstack-typescript-mono-repo
```

### Start the Project

Build and start all services:

```bash
make all
```

Visit:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000](http://localhost:8000)

### Stop the Project

Stop all services:

```bash
make down
```

Stop and remove volumes:

```bash
make down-v
```

### Install Dependencies

Install frontend dependencies:

```bash
make install-frontend
```

Install backend dependencies:

```bash
make install-backend
```

### Rebuild Containers

Rebuild all containers:

```bash
make build
```

Rebuild without cache:

```bash
make build-no-cache
```

Rebuild only the frontend:

```bash
make build-frontend
```

Rebuild only the backend:

```bash
make build-backend
```

## Database Management

### Run Migrations

Apply database migrations:

```bash
make migrate
```

### Seed the Database

Seed the database with initial data:

```bash
make seed
```

### Reset the Database

Drop and recreate the database, then re-run migrations and seeds:

```bash
make reset
```

### Create a New Migration

To create a new migration file, use the following command:

```bash
make migration name=your_migration_name
```

## Project Structure

```plaintext
.
├── docker/                 # Dockerfiles for base, backend, and frontend
├── packages/               # Application source code
│   ├── backend/            # Backend services (Express API)
│   └── frontend/           # Frontend application (React)
│   └── shared/             # Shared package for types, utils etc...   
├── Makefile                # Commands for managing the project
├── docker-compose.yml      # Docker Compose configuration
└── README.md               # Documentation (you're reading this!)
```

## Environment Variables

The project comes with default environment variables pre-configured in the `docker-compose.yml`. Update these values as needed for your development environment:

### Backend

- `NODE_ENV`: Set to `development`.
- `DATABASE_URL`: Connection string for PostgreSQL.
- `AWS_ENDPOINT`: LocalStack endpoint.
- `AWS_REGION`: AWS region (default: `us-east-1`).
- `AWS_ACCESS_KEY_ID`: AWS access key (default: `test`).
- `AWS_SECRET_ACCESS_KEY`: AWS secret key (default: `test`).
- `S3_BUCKET_NAME`: Name of the S3 bucket.
- `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_HOST`: PostgreSQL credentials.

### Frontend

- `NODE_ENV`: Set to `development`.

## LocalStack Configuration

LocalStack is used to emulate AWS services. Currently, the following services are enabled:

- **S3**: For object storage.
- **SQS**: For message queuing.

Health checks ensure that required resources (e.g., S3 buckets and SQS queues) are ready before the backend starts.

## Troubleshooting

### Containers Are Not Running

If a specific container is not running, you can start it individually:

```bash
make check_and_start_container NAME=container_name
```

Replace `container_name` with the name of the container (e.g., `backend`, `frontend`, `postgres`).

### Logs

View logs for a specific container:

```bash
docker-compose logs container_name
```

View logs for all containers:

```bash
docker-compose logs -f
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Happy coding! 🚀


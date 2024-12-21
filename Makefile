# Check if Docker and docker-compose are installed and running
check_docker_installed = \
	if ! command -v docker > /dev/null 2>&1; then \
		echo "Error: Docker is not installed. Please install Docker to proceed. https://docs.docker.com/engine/install/"; \
		exit 1; \
	fi

check_docker_compose_installed = \
	if ! command -v docker-compose > /dev/null 2>&1; then \
		echo "Error: docker-compose is not installed. Please install docker-compose to proceed. https://docs.docker.com/compose/install/"; \
		exit 1; \
	fi

check_docker_running = \
	if ! docker info > /dev/null 2>&1; then \
		echo "Error: Docker does not seem to be running. Please start Docker to proceed. https://docs.docker.com/engine/"; \
		exit 1; \
	fi

# Wrapper to check Docker and docker-compose before any commands
pre_checks:
	@$(check_docker_installed)
	@$(check_docker_compose_installed)
	@$(check_docker_running)

# Add pre-checks to your commands
all: pre_checks up migrate seed

up: pre_checks
	@docker-compose up -d

down: pre_checks
	@docker-compose down --remove-orphans

down-v: pre_checks
	@docker-compose down -v --remove-orphans

build: pre_checks
	@docker-compose build

build-no-cache: pre_checks
	@docker-compose build --no-cache

build-frontend: pre_checks
	@docker-compose build frontend

build-backend: pre_checks
	@docker-compose build backend

install-frontend: pre_checks
	@$(call check_and_start_container,frontend)
	@docker-compose exec frontend npm ci

install-backend: pre_checks
	@$(call check_and_start_container,backend)
	@docker-compose exec backend npm ci

migrate: pre_checks
	@docker-compose exec backend npm run migrate

seed: pre_checks
	@docker-compose exec backend npm run seed

reset: pre_checks
	@$(call check_and_start_container,postgres)
	@$(call check_and_start_container,backend)
	@docker-compose exec postgres psql -U postgres -c 'DROP DATABASE IF EXISTS "dev-db"' || (echo "Failed to drop database" && exit 1)
	@docker-compose exec postgres psql -U postgres -c 'CREATE DATABASE "dev-db"' || (echo "Failed to create database" && exit 1)
	@docker-compose exec backend npm run migrate || (echo "Failed to run migrations" && exit 1)
	@docker-compose exec backend npm run seed || (echo "Failed to run seeds" && exit 1)

UID := $(shell id -u 2>/dev/null || echo 1000)
GID := $(shell id -g 2>/dev/null || echo 1000)

migration: pre_checks
	@if [ -z "$(name)" ]; then \
		echo "Migration name is required. Usage: make create-migration name=your_migration_name"; \
		exit 1; \
	fi
	@docker-compose exec --user $(UID):$(GID) backend npx knex migrate:make $$name --knexfile ./src/knexfile.ts --env development


check_and_start_container = \
	@if [ $$(docker-compose ps -q $(1) | wc -l) -eq 0 ]; then \
		echo "$(1) container is not running. Starting it..."; \
		docker-compose up -d $(1); \
	fi

all: up migrate seed

up:
	docker-compose up -d

down:
	docker-compose down --remove-orphans

down-v:
	docker-compose down -v --remove-orphans

build:
	docker-compose build

build-no-cache:
	docker-compose build --no-cache

build-frontend:
	docker-compose build frontend

build-backend:
	docker-compose build backend

install-frontend:
	$(call check_and_start_container,frontend)
	docker-compose exec frontend npm ci

install-backend:
	$(call check_and_start_container,backend)
	docker-compose exec backend npm ci

migrate:
	docker-compose exec backend npm run migrate

seed:
	docker-compose exec backend npm run seed

reset:
	$(call check_and_start_container,postgres)
	$(call check_and_start_container,backend)
	@docker-compose exec postgres psql -U postgres -c 'DROP DATABASE IF EXISTS "dev-db"' || (echo "Failed to drop database" && exit 1)
	@docker-compose exec postgres psql -U postgres -c 'CREATE DATABASE "dev-db"' || (echo "Failed to create database" && exit 1)
	@docker-compose exec backend npm run migrate || (echo "Failed to run migrations" && exit 1)
	@docker-compose exec backend npm run seed || (echo "Failed to run seeds" && exit 1)

UID := $(shell id -u 2>/dev/null || echo 1000)
GID := $(shell id -g 2>/dev/null || echo 1000)

migration:
	@if [ -z "$(name)" ]; then \
		echo "Migration name is required. Usage: make create-migration name=your_migration_name"; \
		exit 1; \
	fi
	docker-compose exec --user $(UID):$(GID) backend npx knex migrate:make $$name --knexfile ./src/knexfile.ts --env development

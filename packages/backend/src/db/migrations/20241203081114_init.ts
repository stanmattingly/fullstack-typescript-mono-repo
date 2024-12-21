import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  // Create tables in order of foreign key dependencies
}

export async function down(_knex: Knex): Promise<void> {
  // Drop tables in reverse order to handle foreign key constraints
}

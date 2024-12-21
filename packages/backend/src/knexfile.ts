import type { Knex } from 'knex';

const config: Record<string, Knex.Config> = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: 5432,
    },
    migrations: {
      directory: './db/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './db/seeds',
      extension: 'ts',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations',
      extension: 'ts',
    },
    // seeds: {
    //   directory: './db/seeds',
    //   extension: 'ts',
    // },
  },
};

export default config;

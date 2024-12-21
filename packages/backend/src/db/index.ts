import knex, { Knex } from 'knex';
import config from '../knexfile'; // Adjust the path if knexfile is elsewhere

// Determine the environment (default to development)
const environment = process.env.NODE_ENV || 'development';

// Get the configuration for the current environment
const knexConfig = config[environment] as Knex.Config;

// Initialize the Knex instance
const db = knex(knexConfig);

// Export the Knex instance for use in other parts of the application
export default db;

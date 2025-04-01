"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Update with your config settings.
const config = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST || 'dpg-cvltdva4d50c73e7htng-a',
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
            user: process.env.DB_USER || 'postgres_esoft_test_user',
            password: process.env.DB_PASSWORD || 'iPaGX6au8jlrFaUz5hC5RjkzbXZkmTlm',
            database: process.env.DB_DATABASE || 'postgres_esoft_test',
        },
        pool: {
            min: process.env.DB_MIN ? parseInt(process.env.DB_MIN) : 2,
            max: process.env.DB_MAX ? parseInt(process.env.DB_MAX) : 50,
            idleTimeoutMillis: process.env.DB_TIMEOUTMILLIS
                ? parseInt(process.env.DB_TIMEOUTMILLIS)
                : 20000,
        },
        migrations: {
            directory: './migrations',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },
};
exports.default = config;

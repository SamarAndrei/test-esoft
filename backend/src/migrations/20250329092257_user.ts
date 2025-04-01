import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('users', function (table) {
            table.uuid('id').primary();
            table.string('firstName', 255).notNullable();
            table.string('lastName', 255).notNullable();
            table.string('middleName ', 255);
            table.text('login').unique().notNullable();
            table.string('password', 255).notNullable();
            table.enu('role', ['Руководитель', 'Пользователь']).defaultTo('Пользователь').notNullable();
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('users')
}


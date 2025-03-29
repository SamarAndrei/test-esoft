import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('tasks', function(table) {
            table.uuid('id').primary();
            table.string('title').notNullable();
            table.text('description');
            table.timestamp('dueDate').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
            table.enu('priority', ['high', 'medium', 'low']).notNullable();
            table.enu('status', ['pending', 'in_progress', 'completed', 'canceled']).notNullable();
            table.uuid('creatorId').unsigned().notNullable()
                .references('id').inTable('users').onDelete('CASCADE');
            table.uuid('assigneeId').unsigned().notNullable()
                .references('id').inTable('users').onDelete('CASCADE');
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists('tasks')
}


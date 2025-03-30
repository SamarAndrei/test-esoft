import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('tasks', function(table) {
            table.uuid('id').primary();
            table.string('title').notNullable();
            table.text('description');
            table.timestamp('dueDate');
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
            table.enu('priority', ['высокий', 'средний', 'низкий']).notNullable();
            table.enu('status', ['к выполнению', 'выполняется', 'выполнена', 'отменена']).notNullable().defaultTo('к выполнению');
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


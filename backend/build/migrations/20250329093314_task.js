"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema
            .createTable('tasks', function (table) {
            table.uuid('id').primary();
            table.string('title').notNullable();
            table.text('description');
            table.timestamp('due_date').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
            table.enu('priority', ['высокий', 'средний', 'низкий']).notNullable();
            table.enu('status', ['к выполнению', 'выполняется', 'выполнена', 'отменена']).notNullable().defaultTo('к выполнению');
            table.uuid('creatorId').unsigned().notNullable()
                .references('id').inTable('users').onDelete('CASCADE');
            table.uuid('assigneeId').unsigned().notNullable()
                .references('id').inTable('users').onDelete('CASCADE');
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema
            .dropTableIfExists('tasks');
    });
}

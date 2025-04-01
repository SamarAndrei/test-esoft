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
exports.seed = seed;
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        // await knex("tasks").del();
        const existingTasks = yield knex("tasks")
            .whereIn("id", [
            "0195f0d7-f65d-7889-af20-985007c7c1b6",
            "0195f0d7-d562-759b-a948-9835849b12fb",
            "0195f0d8-0cfe-778c-ab90-483333a5f055"
        ]);
        if (existingTasks.length > 0) {
            console.log("Tasks already exist, skipping seed...");
            return;
        }
        // Inserts seed entries
        yield knex("tasks").insert([
            {
                id: '0195f0d7-f65d-7889-af20-985007c7c1b6',
                title: 'Создать документацию',
                description: 'Необходимо создать документацию для проекта.',
                due_date: '2026-04-06T10:10:04.678372',
                createdAt: knex.fn.now(),
                updatedAt: knex.fn.now(),
                priority: 'высокий',
                status: 'к выполнению',
                creatorId: '7a1c4c0b-4d43-7f5d-a7ff-3453a5d1be3a',
                assigneeId: '1a1c4c0b-4d43-7f5d-a7ff-3453a5d1be3a'
            },
            {
                id: '0195f0d7-d562-759b-a948-9835849b12fb',
                title: 'Разработать API',
                description: 'Завершить разработку API для мобильного приложения.',
                due_date: '2025-03-27T10:10:04.678372',
                createdAt: knex.fn.now(),
                updatedAt: knex.fn.now(),
                priority: 'средний',
                status: 'выполняется',
                creatorId: '7a1c4c0b-4d43-7f5d-a7ff-3453a5d1be3a',
                assigneeId: '2a1c4c0b-4d43-7f5d-a7ff-3453a5d1be3a'
            },
            {
                id: '0195f0d8-0cfe-778c-ab90-483333a5f055',
                title: 'Тестирование UI',
                description: 'Провести тестирование интерфейса пользователя на мобильных устройствах.',
                due_date: knex.fn.now(),
                createdAt: knex.fn.now(),
                updatedAt: knex.fn.now(),
                priority: 'низкий',
                status: 'отменена',
                creatorId: '7a1c4c0b-4d43-7f5d-a7ff-3453a5d1be3a',
                assigneeId: '3a1c4c0b-4d43-7f5d-a7ff-3453a5d1be3a'
            }
        ]);
    });
}
;

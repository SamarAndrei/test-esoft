import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    // await knex("tasks").del();

    // Inserts seed entries
    await knex("tasks").insert([
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
};

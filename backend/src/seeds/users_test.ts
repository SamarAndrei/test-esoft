import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    // await knex("users").del();
    const existingUsers = await knex("users")
        .whereIn("id", [
            "1a1c4c0b-4d43-7f5d-a7ff-3453a5d1be3a",
            "2a1c4c0b-4d43-7f5d-a7ff-3453a5d1be3a",
            "3a1c4c0b-4d43-7f5d-a7ff-3453a5d1be3a"
        ]);

    if (existingUsers.length > 0) {
        console.log("Users already exist, skipping seed...");
        return;
    }
    // Inserts seed entries
    await knex("users").insert([
        {
            id: "1a1c4c0b-4d43-7f5d-a7ff-3453a5d1be3a",
            firstName: "Иван",
            lastName: "Иванов",
            login: "ivan",
            password: "123",
            role: "Пользователь",
        },
        {
            id: "2a1c4c0b-4d43-7f5d-a7ff-3453a5d1be3a",
            firstName: "Петр",
            lastName: "Петров",
            login: "petr",
            password: "123",
            role: "Пользователь",
        },
        {
            id: "3a1c4c0b-4d43-7f5d-a7ff-3453a5d1be3a",
            firstName: "Василий",
            lastName: "Васильев",
            login: "vasya",
            password: "123",
            role: "Пользователь",
        }
    ]);
};

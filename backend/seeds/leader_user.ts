import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    // await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
            id: "7a1c4c0b-4d43-7f5d-a7ff-3453a5d1be3a",
            firstName: "Руководитель1",
            lastName: "Админ",
            login: "andrei-25.12.2004",
            password: "$2b$10$pYGKKZnT/LtJK1zg1FLDmebStu/pXvJ3OtYAOLys7oeNGFrApchdW",
            role: "Руководитель",
        },
    ]);
}

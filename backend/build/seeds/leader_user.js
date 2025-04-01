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
        // await knex("users").del();
        // Inserts seed entries
        yield knex("users").insert([
            {
                id: "7a1c4c0b-4d43-7f5d-a7ff-3453a5d1be3a",
                firstName: "Руководитель1",
                lastName: "Админ",
                login: "andrei-25.12.2004",
                password: "$2b$10$pYGKKZnT/LtJK1zg1FLDmebStu/pXvJ3OtYAOLys7oeNGFrApchdW",
                role: "Руководитель",
            },
        ]);
    });
}

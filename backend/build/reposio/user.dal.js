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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const api_errors_1 = require("../exceptions/api_errors");
class UserModel {
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('users');
                yield query.insert(userData);
            }
            catch (err) {
                console.error('Error creating user', err);
                throw err;
            }
        });
    }
    getByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('users');
                return yield query.where('login', login).first();
            }
            catch (err) {
                console.error('Error fetching user by login', err);
                const errorArray = [err instanceof Error ? err.message : String(err)];
                api_errors_1.ApiError.BadConnectToDB(errorArray);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('users');
                return yield query.where('role', 'Пользователь');
            }
            catch (err) {
                console.error('Error fetching all users', err);
                const errorArray = [err instanceof Error ? err.message : String(err)];
                api_errors_1.ApiError.BadConnectToDB(errorArray);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('users');
                return yield query.where('id', id).first();
            }
            catch (err) {
                console.error('Error fetching user', err);
                const errorArray = [err instanceof Error ? err.message : String(err)];
                api_errors_1.ApiError.BadConnectToDB(errorArray);
            }
        });
    }
}
exports.default = UserModel;

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
class TaskModel {
    create(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('tasks');
                yield query.insert(taskData);
            }
            catch (err) {
                console.error('Error creating task', err);
                throw err;
            }
        });
    }
    getById(task_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('tasks');
                return yield query.where('id', task_id).first();
            }
            catch (err) {
                console.error('Error fetching task by id', err);
                const errorArray = [err instanceof Error ? err.message : String(err)];
                api_errors_1.ApiError.BadConnectToDB(errorArray);
            }
        });
    }
    getAll(sortParam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('tasks').orderBy('updatedAt', 'desc');
                if (sortParam === 'today') {
                    const today = new Date().toISOString().split('T')[0];
                    return yield query.whereRaw('DATE(due_date) = ?', [today]);
                }
                if (sortParam === 'week') {
                    const startOfWeek = new Date();
                    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
                    const endOfWeek = new Date();
                    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
                    return yield query.whereBetween('due_date', [startOfWeek.toISOString(), endOfWeek.toISOString()]);
                }
                if (sortParam === 'future') {
                    const today = new Date().toISOString();
                    return yield query.where('due_date', '>', today);
                }
                if (sortParam === 'assignee') {
                    return yield query.orderBy('assigneeId', 'asc');
                }
                return yield query.select();
            }
            catch (err) {
                console.error('Error fetching all tasks', err);
                const errorArray = [err instanceof Error ? err.message : String(err)];
                api_errors_1.ApiError.BadConnectToDB(errorArray);
            }
        });
    }
    getAllByUserId(user_id, sortParam) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('tasks').where('assigneeId', user_id).orderBy('updatedAt', 'desc');
                if (sortParam === 'today') {
                    const today = new Date().toISOString().split('T')[0];
                    return yield query.whereRaw('DATE(due_date) = ?', [today]);
                }
                if (sortParam === 'week') {
                    const startOfWeek = new Date();
                    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
                    const endOfWeek = new Date();
                    endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
                    return yield query.whereBetween('due_date', [startOfWeek.toISOString(), endOfWeek.toISOString()]);
                }
                if (sortParam === 'future') {
                    const today = new Date().toISOString();
                    return yield query.where('due_date', '>', today);
                }
                return yield query.select();
            }
            catch (err) {
                console.error('Error fetching all tasks', err);
                const errorArray = [err instanceof Error ? err.message : String(err)];
                api_errors_1.ApiError.BadConnectToDB(errorArray);
            }
        });
    }
    delete(task_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('tasks');
                yield query.where('id', task_id).delete();
            }
            catch (err) {
                console.error('Error deleting task', err);
                const errorArray = [err instanceof Error ? err.message : String(err)];
                api_errors_1.ApiError.BadConnectToDB(errorArray);
            }
        });
    }
    update(task_id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = (0, db_1.default)('tasks');
                return yield query.where('id', task_id).update(updatedData);
            }
            catch (err) {
                console.error('Error updating task', err);
                const errorArray = [err instanceof Error ? err.message : String(err)];
                api_errors_1.ApiError.BadConnectToDB(errorArray);
            }
        });
    }
}
exports.default = TaskModel;

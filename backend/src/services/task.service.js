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
const uuid_1 = require("uuid");
const UserRole_1 = require("../interfaces/UserRole");
class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    createTask(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskModel.create(Object.assign({ id: (0, uuid_1.v7)() }, taskData));
        });
    }
    getTaskById(task_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskModel.getById(task_id);
        });
    }
    getAllTasks(user_id, user_role, sortParam) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user_role === UserRole_1.UserRole.LEADER) {
                return yield this.taskModel.getAll(sortParam);
            }
            else {
                return yield this.taskModel.getAllByUserId(user_id, sortParam);
            }
        });
    }
    updateTask(task_id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskModel.update(task_id, updatedData);
        });
    }
    deleteTask(task_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.taskModel.delete(task_id);
        });
    }
}
exports.default = TaskService;

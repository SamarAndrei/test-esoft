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
const express_validator_1 = require("express-validator");
const api_errors_1 = require("../exceptions/api_errors");
class TaskController {
    constructor(taskService) {
        this.createTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    const errorMessages = errors.array().map(error => error.msg);
                    return next(api_errors_1.ApiError.BadRequest('Ошибка при валидации', errorMessages));
                }
                yield this.taskService.createTask(Object.assign(Object.assign({}, req.body), { creatorId: req.user.id }));
                res.status(200).json("Задача создана");
            }
            catch (e) {
                next(e);
            }
        });
        this.getTaskById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task_id = req.params.task_id;
                const task = yield this.taskService.getTaskById(task_id);
                if (task) {
                    res.status(200).json(task);
                }
                else {
                    return next(api_errors_1.ApiError.NotFound(`Информация о задаче не найдена`));
                }
            }
            catch (e) {
                next(e);
            }
        });
        this.getAllTasks = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const sortParam = req.query.sort.split('=')[1];
                const user_id = req.user.id;
                const user_role = req.user.role;
                const tasks = yield this.taskService.getAllTasks(user_id, user_role, sortParam);
                if (tasks) {
                    res.status(200).json(tasks);
                }
                else {
                    return next(api_errors_1.ApiError.NotFound(`Информация о задачах не найдена`));
                }
            }
            catch (e) {
                next(e);
            }
        });
        this.updateTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task_id = req.params.task_id;
                const task = yield this.taskService.updateTask(task_id, req.body);
                if (task) {
                    res.status(200).json(task);
                }
                else {
                    return next(api_errors_1.ApiError.NotFound(`Информация о задаче не найдена`));
                }
            }
            catch (e) {
                next(e);
            }
        });
        this.deleteTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task_id = req.params.task_id;
                yield this.taskService.deleteTask(task_id);
                res.status(200).json("Задача успешно удалена");
            }
            catch (e) {
                next(e);
            }
        });
        this.taskService = taskService;
    }
}
exports.default = TaskController;

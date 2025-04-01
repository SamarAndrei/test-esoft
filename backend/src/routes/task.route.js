"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const role_middleware_1 = require("../middleware/role.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const taskValidation = [
    (0, express_validator_1.body)('title')
        .notEmpty().withMessage('Заголовок задачи обязателен')
        .isLength({ max: 255 }).withMessage('Заголовок задачи не должен превышать 255 символов'),
    (0, express_validator_1.body)('description')
        .optional()
        .isLength({ max: 1000 }).withMessage('Описание задачи не должно превышать 1000 символов'),
    (0, express_validator_1.body)('due_date')
        .isISO8601().withMessage('Дата окончания должна быть в формате ISO 8601')
        .toDate()
        .custom((value) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (value < today) {
            throw new Error('Дата окончания не может быть меньше сегодняшней');
        }
        return true;
    }),
    (0, express_validator_1.body)('priority')
        .isIn(['высокий', 'средний', 'низкий']).withMessage('Приоритет должен быть одним из: высокий, средний, низкий'),
    (0, express_validator_1.body)('status')
        .isIn(['к выполнению', 'выполняется', 'выполнена', 'отменена']).withMessage('Статус должен быть одним из: к выполнению, выполняется, выполнена, отменена'),
    (0, express_validator_1.body)('assigneeId')
        .notEmpty().withMessage('Ответственного обязательно')
];
exports.default = (taskController) => {
    const router = express_1.default.Router();
    router.post('/task', taskValidation, (0, role_middleware_1.authorizeRole)(['Руководитель']), taskController.createTask);
    router.get('/task', auth_middleware_1.authenticateJWT, taskController.getAllTasks);
    router.get('/task/:task_id', auth_middleware_1.authenticateJWT, taskController.getTaskById);
    router.patch('/task/:task_id', [(0, express_validator_1.body)('status')
            .isIn(['к выполнению', 'выполняется', 'выполнена', 'отменена']).withMessage('Статус должен быть одним из: к выполнению, выполняется, выполнена, отменена')], auth_middleware_1.authenticateJWT, taskController.updateTask);
    router.delete('/task/:task_id', (0, role_middleware_1.authorizeRole)(['Руководитель']), taskController.deleteTask);
    return router;
};

import express from "express";
import {body, ValidationChain} from "express-validator";
import {authorizeRole} from "../middleware/role.middleware";
import TaskController from "../controllers/task.controller";
import {authenticateJWT} from "../middleware/auth.middleware";

const taskValidation: ValidationChain[] = [
    body('title')
        .notEmpty().withMessage('Заголовок задачи обязателен')
        .isLength({ max: 255 }).withMessage('Заголовок задачи не должен превышать 255 символов'),
    body('description')
        .optional()
        .isLength({ max: 1000 }).withMessage('Описание задачи не должно превышать 1000 символов'),
    body('due_date')
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
    body('priority')
        .isIn(['высокий', 'средний', 'низкий']).withMessage('Приоритет должен быть одним из: высокий, средний, низкий'),
    body('status')
        .isIn(['к выполнению', 'выполняется', 'выполнена', 'отменена']).withMessage('Статус должен быть одним из: к выполнению, выполняется, выполнена, отменена'),
    body('assigneeId')
        .notEmpty().withMessage('Ответственного обязательно')
];

export default (taskController: TaskController) => {
    const router = express.Router();

    router.post(
        '/task',
        taskValidation,
        authorizeRole(['Руководитель']),
        taskController.createTask,
    );
    router.get('/task', authenticateJWT, taskController.getAllTasks);
    router.get('/task/:task_id', authenticateJWT, taskController.getTaskById);
    router.patch(
        '/task/:task_id',
        [body('status')
        .isIn(['к выполнению', 'выполняется', 'выполнена', 'отменена']).withMessage('Статус должен быть одним из: к выполнению, выполняется, выполнена, отменена')],
        authenticateJWT,
        taskController.updateTask
    );
    router.delete(
        '/task/:task_id',
        authorizeRole(['Руководитель']),
        taskController.deleteTask
    );

    return router;
};
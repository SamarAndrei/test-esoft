import {validationResult} from "express-validator";
import {NextFunction, Response} from "express";
import TaskService from "../services/task.service";
import {ApiError} from "../exceptions/api_errors";
import {TSortParam} from "../interfaces/TSortParams";

class TaskController {

    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    createTask = async (req: any, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg);
                return next(
                    ApiError.BadRequest('Ошибка при валидации', errorMessages),
                );
            }

            await this.taskService.createTask({...req.body, creatorId: req.user.id});

            res.status(200).json("Задача создана");
        } catch (e) {
            next(e);
        }
    };

    getTaskById = async (req: any, res: Response, next: NextFunction) => {
        try {
            const task_id = req.params.task_id;
            const task = await this.taskService.getTaskById(task_id);

            if (task) {
                res.status(200).json(task);
            } else {
                return next(
                    ApiError.NotFound(`Информация о задаче не найдена`)
                );
            }
        } catch (e) {
            next(e);
        }
    };

    getAllTasks = async (req: any, res: Response, next: NextFunction) => {
        try {
            const sortParam: TSortParam = req.query.sort.split('=')[1];
            const user_id = req.user.id;
            const user_role = req.user.role;
            const tasks = await this.taskService.getAllTasks(user_id, user_role, sortParam);

            if (tasks) {
                res.status(200).json(tasks);
            } else {
                return next(
                    ApiError.NotFound(`Информация о задачах не найдена`)
                );
            }
        } catch (e) {
            next(e);
        }
    };

    updateTask = async (req: any, res: Response, next: NextFunction) => {
        try {
            const task_id = req.params.task_id;
            const task = await this.taskService.updateTask(task_id, req.body);

            if (task) {
                res.status(200).json(task);
            } else {
                return next(
                    ApiError.NotFound(`Информация о задаче не найдена`)
                );
            }
        } catch (e) {
            next(e);
        }
    };

    deleteTask = async (req: any, res: Response, next: NextFunction) => {
        try {
            const task_id = req.params.task_id;
            await this.taskService.deleteTask(task_id);

            res.status(200).json("Задача успешно удалена");
        } catch (e) {
            next(e);
        }
    };

}

export default TaskController;
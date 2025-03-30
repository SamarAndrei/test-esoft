import {v7} from "uuid";
import TaskModel from "../reposio/task.dal";
import {INewTaskData} from "../interfaces/INewTaskData";
import {UserRole} from "../interfaces/UserRole";
import {TaskStatus} from "../interfaces/TaskStatus";


class TaskService {

    private taskModel: TaskModel;

    constructor(taskModel: TaskModel) {
        this.taskModel = taskModel;
    }

    async createTask(taskData: INewTaskData) {
        return await this.taskModel.create({id: v7(), ...taskData});
    }

    async getTaskById(task_id: string) {
        return await this.taskModel.getById(task_id);
    }

    async getAllTasks(user_id: string, user_role: UserRole) {
        if (user_role === UserRole.LEADER) {
            return await this.taskModel.getAll();
        } else {
            return await this.taskModel.getAllByUserId(user_id);
        }
    }

    async updateTask(task_id: string, status: TaskStatus) {
        return await this.taskModel.update(task_id, status);
    }

    async deleteTask(task_id: string) {
        return await this.taskModel.delete(task_id);
    }
}

export default TaskService;
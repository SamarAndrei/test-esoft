import {v7} from "uuid";
import TaskModel from "../reposio/task.dal";
import {INewTaskData} from "../interfaces/INewTaskData";
import {UserRole} from "../interfaces/UserRole";
import {TSortParam} from "../interfaces/TSortParams";
import {ICreateTaskData} from "../interfaces/ICreateTaskData";


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

    async getAllTasks(user_id: string, user_role: UserRole, sortParam?: TSortParam) {
        if (user_role === UserRole.LEADER) {
            return await this.taskModel.getAll(sortParam);
        } else {
            return await this.taskModel.getAllByUserId(user_id, sortParam);
        }
    }

    async updateTask(task_id: string, updatedData: ICreateTaskData) {
        return await this.taskModel.update(task_id, updatedData);
    }

    async deleteTask(task_id: string) {
        return await this.taskModel.delete(task_id);
    }
}

export default TaskService;
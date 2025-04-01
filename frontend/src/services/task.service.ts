import $api from '../http';
import { AxiosResponse } from 'axios';
import {ITask} from "../models/ITask.ts";
import {TSortParam} from "../models/TSortParam.ts";

export default class TasksService {
    static async createTask(
        taskData: {
            title: string;
            priority: string;
            due_date: string;
            status: string;
            assigneeId: string;
            description?: string;
        }
    ): Promise<AxiosResponse> {
        return $api.post(`/task`, {
            title: taskData.title,
            description: taskData.description,
            priority: taskData.priority,
            due_date: taskData.due_date,
            status: taskData.status,
            assigneeId: taskData.assigneeId,
        });
    }

    static async updateTask(
        task_id: string,
        taskData: {
            title: string;
            priority: string;
            due_date: string;
            status: string;
            assigneeId: string;
            description?: string;
        }
    ): Promise<AxiosResponse> {
        return $api.patch(`/task/${task_id}`, taskData);
    }

    static async getAllTask(q: TSortParam): Promise<AxiosResponse<ITask[]>> {
        return $api.get<ITask[]>(`/task?sort=${q}`);
    }

    static async getTask(
        task_id: string,
    ): Promise<AxiosResponse> {
        return $api.get<ITask>(`/task/${task_id}`);
    }

    static async deleteTask(): Promise<AxiosResponse> {
        return $api.delete(`/task`);
    }
}
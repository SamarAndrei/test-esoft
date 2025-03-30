import $api from '../http';
import { AxiosResponse } from 'axios';
import {ITask} from "../models/ITask.ts";

export default class TasksService {
    static async createTask(
        title: string,
        priority: string,
        status: string,
        assigneeId: string,
        description?: string,
    ): Promise<AxiosResponse> {
        return $api.post(`/task`, {
            title,
            description,
            priority,
            status,
            assigneeId,
        });
    }

    static async updateTask(
        task_id: string,
        status: string,
    ): Promise<AxiosResponse> {
        return $api.post(`/task/${task_id}`, {status});
    }

    static async getAllTask(): Promise<AxiosResponse<ITask[]>> {
        return $api.get<ITask[]>(`/task`);
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
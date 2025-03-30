import db from "../db";
import {ApiError} from "../exceptions/api_errors";
import {TaskStatus} from "../interfaces/TaskStatus";
import {ICreateTaskData} from "../interfaces/ICreateTaskData";

class TaskModel {
    async create(taskData: ICreateTaskData) {
        try {
            const query = db('tasks');
            await query.insert(taskData);
        } catch (err) {
            console.error('Error creating task', err);
            throw err;
        }
    }

    async getById(task_id: string) {
        try {
            const query = db('tasks');
            return await query.where('id', task_id).first();
        } catch (err) {
            console.error('Error fetching task by id', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }

    async getAll() {
        try {
            const query = db('tasks');
            return await query.select();
        } catch (err) {
            console.error('Error fetching all tasks', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }

    async getAllByUserId(user_id: string) {
        try {
            const query = db('tasks');
            return await query.where('assigneeId', user_id);
        } catch (err) {
            console.error('Error fetching all tasks', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }

    async delete(task_id: string) {
        try {
            const query = db('tasks');
            await query.where('id', task_id).delete();
        } catch (err) {
            console.error('Error deleting task', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }

    async update(task_id: string, status: TaskStatus) {
        try {
            const query = db('tasks');
            const task = await query.where('id', task_id).first();
            const updates: Partial<{ status: TaskStatus; dueDate?: Date }> = { status };

            if (status === TaskStatus.COMPLETED && !task.dueDate) {
                updates.dueDate = new Date();
            }

            return await query.where('id', task_id).update(updates);
        } catch (err) {
            console.error('Error updating task', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }

}

export default TaskModel;
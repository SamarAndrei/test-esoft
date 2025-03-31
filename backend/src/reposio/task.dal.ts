import db from "../db";
import {ApiError} from "../exceptions/api_errors";
import {TaskStatus} from "../interfaces/TaskStatus";
import {ICreateTaskData} from "../interfaces/ICreateTaskData";
import {TSortParam} from "../interfaces/TSortParams";

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

    async getAll(sortParam?: TSortParam) {
        try {
            const query = db('tasks').orderBy('updatedAt', 'desc');
            if (sortParam === 'today') {
                const today = new Date().toISOString().split('T')[0];
                return await query.whereRaw('DATE(due_date) = ?', [today]);
            }

            if (sortParam === 'week') {
                const startOfWeek = new Date();
                startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
                const endOfWeek = new Date();
                endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

                return await query.whereBetween('due_date', [startOfWeek.toISOString(), endOfWeek.toISOString()]);
            }

            if (sortParam === 'future') {
                const today = new Date().toISOString();
                return await query.where('due_date', '>', today);
            }

            if (sortParam === 'assignee') {
                return await query.orderBy('assigneeId', 'asc');
            }

            return await query.select();
        } catch (err) {
            console.error('Error fetching all tasks', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }

    async getAllByUserId(user_id: string, sortParam?: TSortParam) {
        try {
            const query = db('tasks').where('assigneeId', user_id).orderBy('updatedAt', 'desc');

            if (sortParam === 'today') {
                const today = new Date().toISOString().split('T')[0];
                return await query.whereRaw('DATE(due_date) = ?', [today]);
            }

            if (sortParam === 'week') {
                const startOfWeek = new Date();
                startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
                const endOfWeek = new Date();
                endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

                return await query.whereBetween('due_date', [startOfWeek.toISOString(), endOfWeek.toISOString()]);
            }

            if (sortParam === 'future') {
                const today = new Date().toISOString();
                return await query.where('due_date', '>', today);
            }

            return await query.select();

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
            return await query.where('id', task_id).update(status);
        } catch (err) {
            console.error('Error updating task', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }

}

export default TaskModel;
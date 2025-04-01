import $api from '../http';
export default class TasksService {
    static async createTask(taskData) {
        return $api.post(`/task`, {
            title: taskData.title,
            description: taskData.description,
            priority: taskData.priority,
            due_date: taskData.due_date,
            status: taskData.status,
            assigneeId: taskData.assigneeId,
        });
    }
    static async updateTask(task_id, taskData) {
        return $api.patch(`/task/${task_id}`, taskData);
    }
    static async getAllTask(q) {
        return $api.get(`/task?sort=${q}`);
    }
    static async getTask(task_id) {
        return $api.get(`/task/${task_id}`);
    }
    static async deleteTask() {
        return $api.delete(`/task`);
    }
}

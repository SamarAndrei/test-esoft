export interface ITask {
    id: string; // uuid
    title: string;
    description?: string;
    due_date: string;
    createdAt: string;
    updatedAt: string;
    priority: 'высокий' | 'средний' | 'низкий';
    status: 'к выполнению' | 'выполняется' | 'выполнена' | 'отменена';
    creatorId: string; // uuid
    assigneeId: string; // uuid
}
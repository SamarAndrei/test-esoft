export interface ICreateTaskData {
    id: string; // uuid
    title: string;
    description?: string;
    priority: 'высокий' | 'средний' | 'низкий';
    status: 'к выполнению' | 'выполняется' | 'выполнена' | 'отменена';
    creatorId: string; // uuid
    assigneeId: string; // uuid

}
export interface INewTaskData {
    title: string;
    description?: string;
    priority: 'высокий' | 'средний' | 'низкий';
    status: 'к выполнению' | 'выполняется' | 'выполнена' | 'отменена';
    creatorId: string;
    assigneeId: string;
}
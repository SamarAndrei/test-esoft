export interface INewTaskData {
    title: string;
    description?: string;
    priority: string;
    status: string;
    creatorId: string;
    assigneeId: string;
}
export interface ICreateTaskData {
    id: string;
    title: string;
    description?: string;
    priority: string;
    status: string;
    creatorId: string;
    assigneeId: string;

}
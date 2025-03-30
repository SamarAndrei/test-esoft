export interface ICreateTaskData {
    id: string; // uuid
    title: string;
    description?: string;
    priority: string;
    status: string;
    creatorId: string; // uuid
    assigneeId: string; // uuid

}
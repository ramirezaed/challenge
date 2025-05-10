export interface ITask {
    id: number;
    title: string;
    description: string;
    completed: number;
    createdAt: string;
}

export interface ITaskForm {
    title: string;
    description: string;
}

export interface ITaskFormUpdate {
    title: string;
    description: string;
    // completed: number;
}
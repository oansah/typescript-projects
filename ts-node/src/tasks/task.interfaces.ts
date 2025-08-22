export interface ITask {
    title: string;
    description: string;
    status: "todo" | "inProgress" | "completed";
    priority: "low" | "normal" | "high";
    dueDate: Date;
}

export interface IPartialTaskWithTaskId extends Partial<ITask> {
    _id: string
}

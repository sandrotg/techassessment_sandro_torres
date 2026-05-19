import { TaskEntity } from "../entities/task.entity";

export interface TaskRepositoryPort {
    createTask(task: TaskEntity): Promise<TaskEntity>;
    updateTask(taskId: number, task: TaskEntity): Promise<TaskEntity | null>;
    deleteTask(id: number): Promise<void>;
    findById(id: number): Promise<TaskEntity | null>;
    findAllByUserId(userId: number): Promise<TaskEntity[]>;
}
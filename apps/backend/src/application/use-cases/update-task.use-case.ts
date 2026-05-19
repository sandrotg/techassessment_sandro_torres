import {
    ForbiddenException,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common";

import { TASK_REPOSITORY } from "../token";

import type { TaskRepositoryPort } from "src/domain/repositories/task.repository.port";

import type { UpdateTaskDto } from "../dto/update-task.dto";

import { TaskEntity } from "src/domain/entities/task.entity";

@Injectable()
export class UpdateTaskUseCase {
    constructor(
        @Inject(TASK_REPOSITORY)
        private readonly taskRepo: TaskRepositoryPort,
    ) { }

    async execute(
        userId: number,
        taskId: number,
        taskInput: UpdateTaskDto,
    ): Promise<TaskEntity | null> {
        const existingTask = await this.taskRepo.findById(taskId);

        if (!existingTask) {
            throw new NotFoundException("Task not found");
        }

        if (existingTask.userId !== userId) {
            throw new ForbiddenException(
                "You cannot update this task",
            );
        }

        const updatedTask = new TaskEntity(
            taskInput.title ?? existingTask.title,

            taskInput.description ??
            existingTask.description,

            taskInput.completed ??
            existingTask.completed,

            existingTask.createdAt,

            taskInput.endDate
                ? new Date(taskInput.endDate)
                : existingTask.endDate,

            existingTask.userId,

            existingTask.user,

            existingTask.id,
        );
        return await this.taskRepo.updateTask(
            taskId,
            updatedTask,
        );
    }
}
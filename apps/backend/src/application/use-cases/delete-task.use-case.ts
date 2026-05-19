import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { TASK_REPOSITORY } from "../token";

import type { TaskRepositoryPort } from "src/domain/repositories/task.repository.port";

@Injectable()
export class DeleteTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepo: TaskRepositoryPort,
  ) {}

  async execute(
    userId: number,
    taskId: number,
  ): Promise<void> {
    const task = await this.taskRepo.findById(taskId);

    if (!task) {
      throw new NotFoundException("Task not found");
    }

    if (task.userId !== userId) {
      throw new ForbiddenException(
        "You cannot delete this task",
      );
    }

    await this.taskRepo.deleteTask(taskId);
  }
}
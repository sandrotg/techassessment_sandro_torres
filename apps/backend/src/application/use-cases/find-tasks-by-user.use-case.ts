import {
  Inject,
  Injectable,
} from "@nestjs/common";

import { TASK_REPOSITORY } from "../token";

import type { TaskRepositoryPort } from "src/domain/repositories/task.repository.port";

import type { TaskEntity } from "src/domain/entities/task.entity";

@Injectable()
export class FindAllTasksByUserIdUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepo: TaskRepositoryPort,
  ) {}

  async execute(
    userId: number,
  ): Promise<TaskEntity[]> {
    return await this.taskRepo.findAllByUserId(userId);
  }
}
import {
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { TASK_REPOSITORY, USER_REPOSITORY } from "../token";

import type { TaskRepositoryPort } from "src/domain/repositories/task.repository.port";
import type { UserRepositoryPort } from "src/domain/repositories/user.repository.port";

import type { CreateTaskDto } from "../dto/create-task.dto";

import { TaskEntity } from "src/domain/entities/task.entity";

@Injectable()
export class CreateTaskUseCase {
  constructor(
    @Inject(TASK_REPOSITORY)
    private readonly taskRepo: TaskRepositoryPort,

    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(
    userId: number,
    taskInput: CreateTaskDto,
  ): Promise<TaskEntity> {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const newTask = new TaskEntity(
      taskInput.title,
      taskInput.description,
      false,
      new Date(),
      new Date(taskInput.endDate),
      userId,
    );

    return await this.taskRepo.createTask(newTask);
  }
}
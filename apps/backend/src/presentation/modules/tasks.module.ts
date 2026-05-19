// src/presentation/modules/tasks.module.ts

import { Module } from "@nestjs/common";

import { TasksController } from "../controllers/tasks.controller";

import { CreateTaskUseCase } from "src/application/use-cases/create-task.use-case";
import { UpdateTaskUseCase } from "src/application/use-cases/update-task.use-case";
import { DeleteTaskUseCase } from "src/application/use-cases/delete-task.use-case";
import { FindAllTasksByUserIdUseCase } from "src/application/use-cases/find-tasks-by-user.use-case";

import {
  TASK_REPOSITORY,
  USER_REPOSITORY,
} from "src/application/token";

import type { TaskRepositoryPort } from "src/domain/repositories/task.repository.port";
import type { UserRepositoryPort } from "src/domain/repositories/user.repository.port";

import { PrismaTaskRepository } from "src/infrastructure/database/prisma/prisma-task.repository";
import { PrismaUserRepository } from "src/infrastructure/database/prisma/prisma-user.repository";

@Module({
  controllers: [TasksController],

  providers: [
    {
      provide: TASK_REPOSITORY,
      useClass: PrismaTaskRepository,
    },

    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },

    {
      provide: CreateTaskUseCase,

      useFactory: (
        taskRepo: TaskRepositoryPort,
        userRepo: UserRepositoryPort,
      ) =>
        new CreateTaskUseCase(
          taskRepo,
          userRepo,
        ),

      inject: [
        TASK_REPOSITORY,
        USER_REPOSITORY,
      ],
    },

    {
      provide: UpdateTaskUseCase,

      useFactory: (
        taskRepo: TaskRepositoryPort,
      ) =>
        new UpdateTaskUseCase(
          taskRepo,
        ),

      inject: [TASK_REPOSITORY],
    },

    {
      provide: DeleteTaskUseCase,

      useFactory: (
        taskRepo: TaskRepositoryPort,
      ) =>
        new DeleteTaskUseCase(
          taskRepo,
        ),

      inject: [TASK_REPOSITORY],
    },

    {
      provide:
        FindAllTasksByUserIdUseCase,

      useFactory: (
        taskRepo: TaskRepositoryPort,
      ) =>
        new FindAllTasksByUserIdUseCase(
          taskRepo,
        ),

      inject: [TASK_REPOSITORY],
    },
  ],
})
export class TasksModule {}
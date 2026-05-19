// src/infrastructure/database/prisma/prisma-task.repository.ts

import { Injectable } from "@nestjs/common";

import { PrismaService } from "./prisma.service";

import type { TaskRepositoryPort } from "src/domain/repositories/task.repository.port";

import { TaskEntity } from "src/domain/entities/task.entity";

@Injectable()
export class PrismaTaskRepository
  implements TaskRepositoryPort
{
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createTask(
    task: TaskEntity,
  ): Promise<TaskEntity> {
    const createdTask =
      await this.prisma.task.create({
        data: {
          title: task.title,
          description: task.description,
          completed: task.completed,
          created_at: task.createdAt,
          end_date: task.endDate,
          user_id: task.userId,
        },
      });

    return new TaskEntity(
      createdTask.title,
      createdTask.description,
      createdTask.completed,
      createdTask.created_at,
      createdTask.end_date,
      createdTask.user_id,
      undefined,
      createdTask.id,
    );
  }

  async updateTask(
    taskId: number,
    task: TaskEntity,
  ): Promise<TaskEntity | null> {
    const updatedTask =
      await this.prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          title: task.title,
          description: task.description,
          completed: task.completed,
          end_date: task.endDate,
        },
      });

    return new TaskEntity(
      updatedTask.title,
      updatedTask.description,
      updatedTask.completed,
      updatedTask.created_at,
      updatedTask.end_date,
      updatedTask.user_id,
      undefined,
      updatedTask.id,
    );
  }

  async deleteTask(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async findById(
    id: number,
  ): Promise<TaskEntity | null> {
    const task =
      await this.prisma.task.findUnique({
        where: {
          id,
        },
      });

    if (!task) {
      return null;
    }

    return new TaskEntity(
      task.title,
      task.description,
      task.completed,
      task.created_at,
      task.end_date,
      task.user_id,
      undefined,
      task.id,
    );
  }

  async findAllByUserId(
    userId: number,
  ): Promise<TaskEntity[]> {
    const tasks =
      await this.prisma.task.findMany({
        where: {
          user_id: userId,
        },
      });

    return tasks.map(
      (task) =>
        new TaskEntity(
          task.title,
          task.description,
          task.completed,
          task.created_at,
          task.end_date,
          task.user_id,
          undefined,
          task.id,
        ),
    );
  }
}
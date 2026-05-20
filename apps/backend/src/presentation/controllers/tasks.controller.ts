// src/presentation/controllers/tasks.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Req
} from "@nestjs/common";

import { CreateTaskUseCase } from "src/application/use-cases/create-task.use-case";
import { UpdateTaskUseCase } from "src/application/use-cases/update-task.use-case";
import { DeleteTaskUseCase } from "src/application/use-cases/delete-task.use-case";
import { FindAllTasksByUserIdUseCase } from "src/application/use-cases/find-tasks-by-user.use-case";

import { CreateTaskDto } from "src/application/dto/create-task.dto";
import { UpdateTaskDto } from "src/application/dto/update-task.dto";
import { JwtAuthGuard } from "src/infrastructure/auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("tasks")
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly findAllTasksUseCase: FindAllTasksByUserIdUseCase,
  ) {}

  @Post()
  async createTask(
    @Req() req,
    @Body() body: CreateTaskDto,
  ) {
    console.log(req.headers.authorization);
    return await this.createTaskUseCase.execute(
      req.user.userId,
      body,
    );
  }

  @Get()
  async findAll(@Req() req,) {
    return await this.findAllTasksUseCase.execute(
      req.user.userId,
    );
  }

  @Put(":id")
  async updateTask(
    @Req() req,
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateTaskDto,
  ) {
    return await this.updateTaskUseCase.execute(
      req.user.userId,
      id,
      body,
    );
  }

  @Delete(":id")
  async deleteTask(
    @Req() req,
    @Param("id", ParseIntPipe) id: number,
  ) {
    await this.deleteTaskUseCase.execute(
      req.user.userId,
      id,
    );

    return {
      message: "Task deleted successfully",
    };
  }
}
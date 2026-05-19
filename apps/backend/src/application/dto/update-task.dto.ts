// src/application/dto/update-task.dto.ts

import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class UpdateTaskDto {
  @ApiProperty({
    description: "task title",
    example: "Finish backend assessment",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: "task description",
    example: "Implement JWT authentication",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "task's end date",
    example: "2026-05-30T23:59:59.000Z",
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({
    description: "task completion status",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
// src/application/dto/create-task.dto.ts

import {
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "task title",
    example: "user module"
  })
  title!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "task description",
    example: "implement user module with auth to study planner"
  })
  description!: string;

  @IsDateString()
  @ApiProperty({
    description: "task's end date",
    example: "2026-05-30T23:59:59.000Z",
  })
  endDate!: string;
}
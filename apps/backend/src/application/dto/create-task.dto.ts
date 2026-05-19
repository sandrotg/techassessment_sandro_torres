// src/application/dto/create-task.dto.ts

import {
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsDateString()
  endDate!: string;
}
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: "user email",
    example: "sandro@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: "user password",
    example: "securePassword123",
  })
  @IsString()
  @MinLength(6)
  password!: string;
}
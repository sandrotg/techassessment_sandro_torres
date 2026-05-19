// src/presentation/modules/users.module.ts

import { Module } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";

import { JwtModule } from "@nestjs/jwt";

import { UsersController } from "../controllers/users.controller";

import { RegisterUseCase } from "src/application/use-cases/register.use-case";
import { LoginUseCase } from "src/application/use-cases/login.use-case";

import { USER_REPOSITORY } from "src/application/token";

import type { UserRepositoryPort } from "src/domain/repositories/user.repository.port";

import { PrismaUserRepository } from "src/infrastructure/database/prisma/prisma-user.repository";

@Module({

  controllers: [UsersController],

  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },

    {
      provide: RegisterUseCase,

      useFactory: (
        repo: UserRepositoryPort,
      ) =>
        new RegisterUseCase(repo),

      inject: [USER_REPOSITORY],
    },

    {
      provide: LoginUseCase,

      useFactory: (
        repo: UserRepositoryPort,
        jwtService,
      ) =>
        new LoginUseCase(
          repo,
          jwtService,
        ),

      inject: [
        USER_REPOSITORY,
        JwtService,
      ],
    },
  ],
})
export class UsersModule {}
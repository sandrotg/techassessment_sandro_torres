// src/infrastructure/database/prisma/prisma-user.repository.ts

import { Injectable } from "@nestjs/common";

import { PrismaService } from "./prisma.service";

import type { UserRepositoryPort } from "src/domain/repositories/user.repository.port";

import { UserEntity } from "src/domain/entities/user.entity";

@Injectable()
export class PrismaUserRepository
  implements UserRepositoryPort
{
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async register(
    user: UserEntity,
  ): Promise<UserEntity> {
    const createdUser =
      await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      });

    return new UserEntity(
      createdUser.name,
      createdUser.email,
      createdUser.password,
      undefined,
      createdUser.id,
    );
  }

  async findById(
    id: number,
  ): Promise<UserEntity | null> {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

    if (!user) {
      return null;
    }

    return new UserEntity(
      user.name,
      user.email,
      user.password,
      undefined,
      user.id,
    );
  }

  async findByEmail(
    email: string,
  ): Promise<UserEntity | null> {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return null;
    }

    return new UserEntity(
      user.name,
      user.email,
      user.password,
      undefined,
      user.id,
    );
  }
}
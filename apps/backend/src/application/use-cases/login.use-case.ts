import {
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import * as bcrypt from "bcrypt";

import { USER_REPOSITORY } from "../token";

import type { UserRepositoryPort } from "src/domain/repositories/user.repository.port";
import type { LoginDto } from "../dto/login.dto";
import type { UserEntity } from "src/domain/entities/user.entity";

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  async execute(loginInput: LoginDto): Promise<UserEntity> {
    const user = await this.userRepo.findByEmail(loginInput.email);

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const passwordMatch = await bcrypt.compare(
      loginInput.password,
      user.password,
    );

    if (!passwordMatch)throw new UnauthorizedException("Invalid credentials");

    return user;
  }
}
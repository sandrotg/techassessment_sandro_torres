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
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort, private readonly jwtService: JwtService
  ) {}

  async execute(loginInput: LoginDto) {
    const user = await this.userRepo.findByEmail(loginInput.email);

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const passwordMatch = await bcrypt.compare(
      loginInput.password,
      user.password,
    );

    if (!passwordMatch)throw new UnauthorizedException("Invalid credentials");

    const payload = {
      sub: user.id,
      email: user.email,
    };
    console.log("JWT SERVICE:", this.jwtService);
console.log("SECRET?", (this.jwtService as any).options);

    const access_token =
      await this.jwtService.signAsync(
        payload,
      );

    return {
      access_token,
      user,
    };
  }
}
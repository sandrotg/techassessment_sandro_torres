import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "../token";
import type { UserRepositoryPort } from "src/domain/repositories/user.repository.port";
import { RegisterDto } from "../dto/register.dto";
import * as bcrypt from "bcrypt";
import { UserEntity } from "src/domain/entities/user.entity";

@Injectable()
export class RegisterUseCase {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepo: UserRepositoryPort) { }

    async execute(userInput: RegisterDto): Promise<UserEntity> {
        const existingUser = await this.userRepo.findByEmail(userInput.email);
        if (existingUser !== null) throw new ConflictException('User already exists');
        const passwordHash = await bcrypt.hash(userInput.password, 10);
        const newUser = new UserEntity(
            userInput.name,
            userInput.email,
            passwordHash
        );
        return await this.userRepo.register(newUser);
    }
}
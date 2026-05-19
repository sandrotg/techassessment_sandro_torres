// src/presentation/controllers/users.controller.ts

import {
    Body,
    Controller,
    Post,
} from "@nestjs/common";

import { RegisterUseCase } from "src/application/use-cases/register.use-case";
import { LoginUseCase } from "src/application/use-cases/login.use-case";

import { RegisterDto } from "src/application/dto/register.dto";
import { LoginDto } from "src/application/dto/login.dto";

@Controller("users")
export class UsersController {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase,
    ) { }

    @Post("register")
    async register(
        @Body() body: RegisterDto,
    ) {
        const user =
            await this.registerUseCase.execute(body);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }

    @Post("login")
    async login(
        @Body() body: LoginDto,
    ) {
        return await this.loginUseCase.execute(
            body,
        );
    }
}
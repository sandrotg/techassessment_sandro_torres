import { UserEntity } from "../entities/user.entity";


export interface userRepositoryPort {
    register(user:UserEntity): Promise<UserEntity>;
    login(email: string, password: string): Promise<UserEntity | null>;
    findById(id: number): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
}
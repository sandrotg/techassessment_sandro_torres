import { UserEntity } from "../entities/user.entity";


export interface UserRepositoryPort {
    register(user:UserEntity): Promise<UserEntity>;
    findById(id: number): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
}
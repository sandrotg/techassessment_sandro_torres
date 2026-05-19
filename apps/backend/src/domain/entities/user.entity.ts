import { TaskEntity } from './task.entity';

export class UserEntity {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public tasks?: TaskEntity[],
    public readonly id?: number,
  ) {}
}
import { TaskEntity } from './task.entity';

export class UserEntity {
  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
    public password: string,
    public tasks?: TaskEntity[],
  ) {}
}
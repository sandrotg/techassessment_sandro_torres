import { UserEntity } from './user.entity';

export class TaskEntity {
  constructor(
    public readonly id: number,
    public title: string,
    public description: string,
    public completed: boolean,
    public createdAt: Date,
    public endDate: Date,
    public userId: number,
    public user?: UserEntity,
  ) {}
}
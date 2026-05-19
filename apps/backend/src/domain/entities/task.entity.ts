import { UserEntity } from './user.entity';

export class TaskEntity {
  constructor(
    public title: string,
    public description: string,
    public completed: boolean,
    public createdAt: Date,
    public endDate: Date,
    public userId: number,
    public user?: UserEntity,
    public readonly id?: number,
  ) {}
}
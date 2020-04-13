import { taskStatus } from '../task-status.enum';
import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([taskStatus.DONE, taskStatus.IN_PROGRESS, taskStatus.OPEN])
  status: taskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}

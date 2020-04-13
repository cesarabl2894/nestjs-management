import { PipeTransform, BadRequestException } from '@nestjs/common';
import { taskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    taskStatus.DONE,
    taskStatus.IN_PROGRESS,
    taskStatus.OPEN,
  ];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status) {
    const index = this.allowedStatus.indexOf(status);

    return index !== -1;
  }
}

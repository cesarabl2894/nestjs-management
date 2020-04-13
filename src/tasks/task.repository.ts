import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { taskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');
  async getTasks(
    taskfilterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { search, status } = taskfilterDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.description LIKE :search OR task.title LIKE :search',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user: ${user.username}. Data: ${JSON.stringify(
          taskfilterDto,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = new Task();
    const { title, description } = createTaskDto;

    task.title = title;
    task.description = description;
    task.status = taskStatus.OPEN;
    task.user = user;

    try {
      await task.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a new task for user: ${
          user.username
        }. Data: ${JSON.stringify(createTaskDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete task.user;

    return task;
  }
}

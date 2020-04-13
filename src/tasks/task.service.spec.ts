import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { taskStatus } from './task-status.enum';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = { id: 1, username: 'ctest' };

describe('TaskService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('Get All Tasks', () => {
    it('getTasks', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');
      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const filtersDto: GetTasksFilterDto = {
        status: taskStatus.DONE,
        search: 'ss',
      };
      // get All Tasks
      const result = await tasksService.getTasks(filtersDto, mockUser);
      // Expect repository have been called
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('Get Task By Id', () => {
    it('calls repository.findOne() and return the task', async () => {
      const mockTask = { decription: 'This is a mock test', title: 'mockTest' };

      taskRepository.findOne.mockResolvedValue(mockTask);
      const task = await tasksService.getTaskById(1, mockUser.id);

      expect(task).toEqual(mockTask);

      // expect(taskRepository.findOne).toHaveBeenCalledWith({
      //   where: {
      //     id: 1,
      //     userId: mockUser.id,
      //   },
      // });
    });
    it('Throw Error if is not found', () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(1, mockUser.id)).rejects.toThrow();
    });
  });
});

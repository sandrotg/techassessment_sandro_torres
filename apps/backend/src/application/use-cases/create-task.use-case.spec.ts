import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskUseCase } from './create-task.use-case';
import { TaskRepositoryPort } from 'src/domain/repositories/task.repository.port';
import { UserRepositoryPort } from 'src/domain/repositories/user.repository.port';
import { TaskEntity } from 'src/domain/entities/task.entity';
import { UserEntity } from 'src/domain/entities/user.entity';
import { TASK_REPOSITORY, USER_REPOSITORY } from '../token';

describe('CreateTaskUseCase', () => {
  let createTaskUseCase: CreateTaskUseCase;
  let mockTaskRepository: jest.Mocked<TaskRepositoryPort>;
  let mockUserRepository: jest.Mocked<UserRepositoryPort>;

  beforeEach(async () => {
    jest.clearAllMocks();

    // Mock del repositorio de tareas
    mockTaskRepository = {
      createTask: jest.fn(),
      findById: jest.fn(),
      findByUserId: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
    } as any;

    // Mock del repositorio de usuarios
    mockUserRepository = {
      findByEmail: jest.fn(),
      register: jest.fn(),
      findById: jest.fn(),
    } as any;

    // Crear el módulo de testing
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTaskUseCase,
        {
          provide: TASK_REPOSITORY,
          useValue: mockTaskRepository,
        },
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    createTaskUseCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);
  });

  describe('execute', () => {
    it('Debe crear una task exitosamente cuando el usuario existe', async () => {
      // ARRANGE
      const userId = 1;
      const createTaskDto = {
        title: 'Implementar login',
        description: 'Crear sistema de autenticación JWT',
        endDate: '2026-05-25',
      };

      const existingUser = new UserEntity(
        'Juan Pérez',
        'juan@example.com',
        'hashed_password',
      );

      const createdTask = new TaskEntity(
        createTaskDto.title,
        createTaskDto.description,
        false,
        new Date(),
        new Date(createTaskDto.endDate),
        userId,
        undefined,
        1,
      );

      mockUserRepository.findById.mockResolvedValue(existingUser);
      mockTaskRepository.createTask.mockResolvedValue(createdTask);

      // ACT
      const result = await createTaskUseCase.execute(userId, createTaskDto);

      // ASSERT
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
      expect(mockTaskRepository.createTask).toHaveBeenCalled();
      expect(result.title).toBe(createTaskDto.title);
      expect(result.userId).toBe(userId);
      expect(result.completed).toBe(false);
    });

    it('Debe lanzar NotFoundException si el usuario no existe', async () => {
      // ARRANGE
      const userId = 999;
      const createTaskDto = {
        title: 'Tarea de un usuario fantasma',
        description: 'Esta tarea no se debe crear',
        endDate: '2026-05-25',
      };

      // Usuario no existe
      mockUserRepository.findById.mockResolvedValue(null);

      // ACT & ASSERT
      await expect(
        createTaskUseCase.execute(userId, createTaskDto),
      ).rejects.toThrow(NotFoundException);

      // Verifica que nunca intente crear la tarea
      expect(mockTaskRepository.createTask).not.toHaveBeenCalled();
    });

    it('Debe asociar correctamente la tarea al usuario propietario', async () => {
      // ARRANGE
      const userId = 5;
      const createTaskDto = {
        title: 'Desarrollar API REST',
        description: 'Crear endpoints para gestión de tareas',
        endDate: '2026-06-01',
      };

      const user = new UserEntity(
        'Ana García',
        'ana@example.com',
        'hashed_password_xyz',
      );

      const createdTask = new TaskEntity(
        createTaskDto.title,
        createTaskDto.description,
        false,
        new Date(),
        new Date(createTaskDto.endDate),
        userId,
        user,
        42,
      );

      mockUserRepository.findById.mockResolvedValue(user);
      mockTaskRepository.createTask.mockResolvedValue(createdTask);

      // ACT
      const result = await createTaskUseCase.execute(userId, createTaskDto);

      // ASSERT - Verifica que la tarea está asociada al usuario correcto
      expect(result.userId).toBe(userId);
      expect(result.user).toEqual(user);

      // Verifica que se pasó la tarea correcta al repositorio
      const callArgument = mockTaskRepository.createTask.mock.calls[0][0];
      expect(callArgument.userId).toBe(userId);
    });

    it('Debe inicializar la tarea con completed en false', async () => {
      // ARRANGE
      const userId = 3;
      const createTaskDto = {
        title: 'Testing unitario',
        description: 'Escribir tests para todas las funcionalidades',
        endDate: '2026-06-15',
      };

      const user = new UserEntity(
        'Carlos López',
        'carlos@example.com',
        'hash_123',
      );

      const createdTask = new TaskEntity(
        createTaskDto.title,
        createTaskDto.description,
        false,
        new Date(),
        new Date(createTaskDto.endDate),
        userId,
        user,
        10,
      );

      mockUserRepository.findById.mockResolvedValue(user);
      mockTaskRepository.createTask.mockResolvedValue(createdTask);

      // ACT
      const result = await createTaskUseCase.execute(userId, createTaskDto);

      // ASSERT - Una tarea nueva siempre debe estar incompleta
      expect(result.completed).toBe(false);
    });
  });
});

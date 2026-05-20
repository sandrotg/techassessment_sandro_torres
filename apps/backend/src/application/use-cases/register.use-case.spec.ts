import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { RegisterUseCase } from './register.use-case';
import { UserRepositoryPort } from 'src/domain/repositories/user.repository.port';
import { UserEntity } from 'src/domain/entities/user.entity';
import { USER_REPOSITORY } from '../token';
import * as bcrypt from 'bcrypt';

// Mock de bcrypt para controlar el hash en los tests
jest.mock('bcrypt');

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase;
  let mockUserRepository: jest.Mocked<UserRepositoryPort>;

  beforeEach(async () => {
    // Limpiar los mocks antes de cada test
    jest.clearAllMocks();

    // Crear un mock del repositorio
    mockUserRepository = {
      findByEmail: jest.fn(),
      register: jest.fn(),
      findById: jest.fn(),
    } as any;

    // Crear el módulo de testing con el mock
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUseCase,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    registerUseCase = module.get<RegisterUseCase>(RegisterUseCase);
  });

  describe('execute', () => {
    it('Debe registrar un usuario nuevo exitosamente', async () => {
      // ARRANGE - Preparar los datos
      const registerDto = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        password: 'password123',
      };

      const hashedPassword = 'hashed_password_123';
      const expectedUser = new UserEntity(
        registerDto.name,
        registerDto.email,
        hashedPassword,
      );

      // Configurar los mocks
      mockUserRepository.findByEmail.mockResolvedValue(null); // Usuario no existe
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockUserRepository.register.mockResolvedValue(expectedUser);

      // ACT - Ejecutar el código a probar
      const result = await registerUseCase.execute(registerDto);

      // ASSERT - Verificar los resultados
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(registerDto.password, 10);
      expect(mockUserRepository.register).toHaveBeenCalledWith(expectedUser);
      expect(result).toEqual(expectedUser);
    });

    it('Debe lanzar ConflictException si el usuario ya existe', async () => {
      // ARRANGE
      const registerDto = {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        password: 'password123',
      };

      const existingUser = new UserEntity(
        'Juan',
        registerDto.email,
        'hashed_password',
      );

      // El usuario ya existe
      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      // ACT & ASSERT - Verificar que lanza la excepción
      await expect(registerUseCase.execute(registerDto)).rejects.toThrow(
        ConflictException,
      );

      // Verificar que nunca llega a encriptar o guardar
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(mockUserRepository.register).not.toHaveBeenCalled();
    });

    it('Debe encriptar la contraseña correctamente', async () => {
      // ARRANGE
      const registerDto = {
        name: 'Ana García',
        email: 'ana@example.com',
        password: 'miContraseña123',
      };

      const hashedPassword = 'hash_muy_largo_y_seguro_xyz';
      const expectedUser = new UserEntity(
        registerDto.name,
        registerDto.email,
        hashedPassword,
      );

      mockUserRepository.findByEmail.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockUserRepository.register.mockResolvedValue(expectedUser);

      // ACT
      await registerUseCase.execute(registerDto);

      // ASSERT - Verificar que bcrypt.hash fue llamado con los parámetros correctos
      expect(bcrypt.hash).toHaveBeenCalledWith(registerDto.password, 10);
      // 10 es el número de rounds de salt de bcrypt (mayor número = más seguro pero más lento)
    });
  });
});

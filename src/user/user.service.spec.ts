import { UserService } from './user.service';
import { UserEntity } from './entities/User.entity';
import { Repository } from 'typeorm';
import { createMock } from '@golevelup/ts-jest';
import { randomUUID } from 'crypto';

describe('UserService', () => {
  const date = new Date();
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(() => {
    userRepository = createMock<Repository<UserEntity>>();
    userService = new UserService(userRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('get', () => {
    it('should return a user entity if the user is found', async () => {
      // Given
      const userId = randomUUID();

      // When
      userRepository.findOneBy = jest.fn().mockResolvedValue(
        new UserEntity({
          id: userId,
          name: 'John Doe',
          email: 'johndoe@email.com',
          cpf: '123456789',
          phoneNumber: '123456789',
          createdAt: date,
          updatedAt: date,
        }),
      );

      const result = await userService.get(userId);

      // Then
      expect(result).toBeInstanceOf(UserEntity);
      expect(result).toEqual({
        id: userId,
        name: 'John Doe',
        email: 'johndoe@email.com',
        cpf: '123456789',
        phoneNumber: '123456789',
        createdAt: date,
        updatedAt: date,
      });
    });

    it('should throw NotFoundException if the user is not found', async () => {
      // Given
      const userId = '999';
      userRepository.findOneBy = jest.fn().mockResolvedValue(null);

      // When / Then
      await expect(userService.get(userId)).rejects.toThrow('User not found');
    });
  });
});

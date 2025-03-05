import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

describe('UserController', () => {
  let controller: UserController;
  let userServiceMock: { get: jest.Mock };

  beforeEach(async () => {
    userServiceMock = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should throw an error if the user does not exist', async () => {
      // Given
      const userId = randomUUID();

      userServiceMock.get.mockRejectedValue(
        new NotFoundException('User not found'),
      );

      // When / Then
      await expect(controller.get(userId)).rejects.toThrow('User not found');
      expect(userServiceMock.get).toHaveBeenCalledWith(userId);
    });

    it('should return user by id', async () => {
      // Given
      const userId = randomUUID();
      const user = {
        id: userId,
        name: 'John Doe',
        email: 'johndoe@email.com',
        cpf: '12345678900',
        phoneNumber: '12345678900',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      userServiceMock.get.mockResolvedValue(user);

      // When
      const response = await controller.get(userId);

      // Then
      expect(response).toEqual({
        id: userId,
        name: 'John Doe',
        email: 'johndoe@email.com',
        cpf: '12345678900',
        phone_number: '12345678900',
      });
      expect(userServiceMock.get).toHaveBeenCalledWith(userId);
    });
  });
});

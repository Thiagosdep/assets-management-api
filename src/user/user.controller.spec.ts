import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';

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
    it('should throw an error if the user does not exist', () => {
      // Given
      const userId = '3';

      userServiceMock.get = jest.fn().mockImplementation(() => {
        throw new NotFoundException('User not found');
      });

      // When
      const response = () => controller.get(userId);

      // Then
      expect(response).toThrow('User not found');
      expect(userServiceMock.get).toHaveBeenCalledWith(userId);
    });

    it('should return user by id', () => {
      // Given
      const userId = '3';

      // Configura o mock para lançar uma exceção
      userServiceMock.get = jest.fn().mockReturnValue({
        id: userId,
        name: 'John Doe',
        email: 'johndoe@email.com',
        cpf: '12345678900',
        phoneNumber: '12345678900',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });

      // When
      const response = controller.get(userId);

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

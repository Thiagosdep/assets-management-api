import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { users } from '../mocks/user';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('get', () => {
    it('should return a user entity if the user is found', () => {
      // Given
      const userId = '1';
      const expectedUser = users.find((user) => user.id === userId);

      // When
      const result = userService.get(userId);

      // Then
      expect(result).toBeInstanceOf(UserEntity);
      expect(result.id).toBe(expectedUser?.id);
      expect(result.name).toBe(expectedUser?.name);
    });

    it('should throw NotFoundException if the user is not found', () => {
      // Given
      const userId = '999';

      // When / Then
      expect(() => userService.get(userId)).toThrow('User not found');
    });
  });
});

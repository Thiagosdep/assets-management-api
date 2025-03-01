import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { users } from '../mocks/user';

@Injectable()
export class UserService {
  get(id: string): UserEntity {
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new UserEntity(user);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionNameEnum } from '../infrastructure/database/database.provider';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity, ConnectionNameEnum.ONLY_READ)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async get(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return new UserEntity(user);
  }
}

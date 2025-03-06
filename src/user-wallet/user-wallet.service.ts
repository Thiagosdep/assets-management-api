import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserWalletEntity } from './entities/UserWallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionNameEnum } from '../infrastructure/database/database.provider';

@Injectable()
export class UserWalletService {
  constructor(
    @InjectRepository(UserWalletEntity, ConnectionNameEnum.ONLY_READ)
    private readonly userWalletRepository: Repository<UserWalletEntity>,
  ) {}

  async get(id: string): Promise<UserWalletEntity> {
    const userWallet = await this.userWalletRepository
      .createQueryBuilder('userWallets')
      .leftJoinAndSelect(
        'userWallets.userWalletHistories',
        'userWalletHistories',
      )
      .where('userWallets.id = :id', { id })
      .andWhere('userWallets.deletedAt IS NULL')
      .orderBy('userWalletHistories.createdAt', 'DESC')
      .limit(1)
      .getOne();

    if (!userWallet) {
      throw new NotFoundException('UserWallet not found');
    }

    return new UserWalletEntity(userWallet);
  }
}

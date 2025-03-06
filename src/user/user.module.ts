import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/User.entity';
import { ConnectionNameEnum } from '../infrastructure/database/database.provider';

const typeOrmFeatureConfig = [
  TypeOrmModule.forFeature([UserEntity], ConnectionNameEnum.ONLY_READ),
  TypeOrmModule.forFeature([UserEntity], ConnectionNameEnum.READ_WRITE),
];
@Module({
  imports: [...typeOrmFeatureConfig],
  controllers: [UserController],
  exports: [UserService, ...typeOrmFeatureConfig],
  providers: [UserService],
})
export class UserModule {}

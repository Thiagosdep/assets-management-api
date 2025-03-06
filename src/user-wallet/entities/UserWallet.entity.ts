import { UserEntity } from '../../user/entities/User.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserWalletHistoryEntity } from './UserWalletHistory.entity';

@Entity({ name: 'user_wallets' })
export class UserWalletEntity {
  constructor(partial: Partial<UserWalletEntity>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, default: true })
  active: boolean;

  @Column({ nullable: false, name: 'user_id' })
  userId: string;

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, default: null })
  deletedAt: Date | null;

  @ManyToOne(() => UserEntity, (user) => user.userWallets)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(
    () => UserWalletHistoryEntity,
    (userWalletHistory) => userWalletHistory.userWallet,
  )
  @JoinColumn({ name: 'id' })
  userWalletHistories: UserWalletHistoryEntity[];
}

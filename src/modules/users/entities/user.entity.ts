import { Exclude } from 'class-transformer';
import OrderEntity from '../../orders/entities/order.entity';

import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'TB_USERS', schema: process.env.DATABASE_SCHEMA })
class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'CD_USER' })
  id!: string;

  @Column({ name: 'DE_USER', length: 50, nullable: false })
  name: string;

  @Column({ name: 'EMAIL', nullable: false })
  email: string;

  @Exclude()
  @Column({ name: 'PASSWORD', nullable: false })
  password: string;

  @Column({ name: 'ACTIVE', default: true })
  active: boolean;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders?: OrderEntity[];

  @CreateDateColumn({ name: 'CREATED_AT' })
  createAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'DELETED_AT' })
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  private async protectPassword() {
    // this.password = encryptPassword(this.password);
  }
}

export default UserEntity;

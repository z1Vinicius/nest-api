import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'TB_USER', schema: process.env.DATABASE_SCHEMA })
class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'CD_USER' })
  id!: string;

  @Column({ name: 'DE_USER', length: 50, nullable: false })
  name: string;

  @Column({ name: 'EMAIL', nullable: false })
  email: string;

  @Column({ name: 'PASSWORD', nullable: false })
  password: string;

  @Column({ name: 'ACTIVE', default: true })
  active: boolean;

  @CreateDateColumn({ name: 'CREATED_AT' })
  createAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'DELETED_AT' })
  deletedAt: Date;

  constructor(name: string, email: string, password: string, active: boolean) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.active = active;
  }
}

export default UserEntity;

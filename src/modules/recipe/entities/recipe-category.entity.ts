import { BaseEntity, Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

class RecipeCategoryEntity extends BaseEntity {
  @ObjectIdColumn()
  id!: number;

  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;
}

export default RecipeCategoryEntity;

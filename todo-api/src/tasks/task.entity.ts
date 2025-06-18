import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Priority } from './tasks.priority.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.MEDIUM,
  })
  priority: Priority;

  @Column({ default: false })
  isDone: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

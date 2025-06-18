import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { Task } from './task.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepo.create(dto);
    return this.taskRepo.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepo.find();
  }

  async findOne(id: string): Promise<Task | null> {
    return this.taskRepo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
  await this.taskRepo.update(id, dto);
  const updated = await this.findOne(id);

  if (!updated) {
    throw new Error('Task not found');
  }

  return updated;
}

  async remove(id: string): Promise<void> {
    await this.taskRepo.delete(id);
  }
}

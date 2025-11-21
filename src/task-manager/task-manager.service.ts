import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskManager } from './entities/task-manager.entity';
import { CreateTaskManagerDto } from './dto/create-task-manager.dto';
import { UpdateTaskManagerDto } from './dto/update-task-manager.dto';

@Injectable()
export class TaskManagerService {
  constructor(
    @InjectRepository(TaskManager)
    private readonly repo: Repository<TaskManager>,
  ) {}

  create(createTaskManagerDto: CreateTaskManagerDto): Promise<TaskManager> {
    const task = this.repo.create(createTaskManagerDto);
    return this.repo.save(task);
  }

  findAll(userId: number): Promise<TaskManager[]> {
    return this.repo.find({ where: { userId } });
  }

  async findOne(id: number): Promise<TaskManager> {
    const task = await this.repo.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  async update(id: number, updateTaskManagerDto: UpdateTaskManagerDto): Promise<TaskManager> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskManagerDto);
    return this.repo.save(task);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}

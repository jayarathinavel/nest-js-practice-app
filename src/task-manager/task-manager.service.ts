import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskManagerDto } from './dto/create-task-manager.dto';
import { UpdateTaskManagerDto } from './dto/update-task-manager.dto';
import { TaskManager } from './entities/task-manager.entity';

@Injectable()
export class TaskManagerService {
  private tasks: TaskManager[] = [];
  private nextId = 1;

  create(createTaskManagerDto: CreateTaskManagerDto): TaskManager {
    const task: TaskManager = {
      id: this.nextId++,
      title: createTaskManagerDto.title,
      description: createTaskManagerDto.description ?? '',
      status: createTaskManagerDto.status ?? 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.push(task);
    return task;
  }

  findAll(): TaskManager[] {
    return this.tasks;
  }

  findOne(id: number): TaskManager {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    return task;
  }

  update(id: number, updateTaskManagerDto: UpdateTaskManagerDto): TaskManager {
    const task = this.findOne(id);
    Object.assign(task, updateTaskManagerDto);
    task.updatedAt = new Date();
    return task;
  }

  remove(id: number): void {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException(`Task with ID ${id} not found`);
    this.tasks.splice(index, 1);
  }
}

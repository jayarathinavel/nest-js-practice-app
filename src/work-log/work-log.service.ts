import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkLogDto } from './dto/create-work-log.dto';
import { UpdateWorkLogDto } from './dto/update-work-log.dto';
import { WorkLog } from './entities/work-log.entity';

@Injectable()
export class WorkLogService {
  private worklogs: WorkLog[] = [];
  private nextId = 1;

  create(dto: CreateWorkLogDto): WorkLog {
    const worklog: WorkLog = {
      id: this.nextId++,
      date: dto.date,
      done: dto.done || '',
      todo: dto.todo || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.worklogs.unshift(worklog); // latest first
    return worklog;
  }

  findAll(): WorkLog[] {
    return this.worklogs;
  }

  findOne(id: number): WorkLog {
    const log = this.worklogs.find((l) => l.id === id);
    if (!log) throw new NotFoundException(`WorkLog with ID ${id} not found`);
    return log;
  }

  update(id: number, dto: UpdateWorkLogDto): WorkLog {
    const log = this.findOne(id);
    Object.assign(log, dto);
    log.updatedAt = new Date();
    return log;
  }

  remove(id: number): void {
    const index = this.worklogs.findIndex((l) => l.id === id);
    if (index === -1) throw new NotFoundException(`WorkLog with ID ${id} not found`);
    this.worklogs.splice(index, 1);
  }
}

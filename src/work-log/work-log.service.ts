import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WorkLog } from './entities/work-log.entity';
import { CreateWorkLogDto } from './dto/create-work-log.dto';
import { UpdateWorkLogDto } from './dto/update-work-log.dto';

@Injectable()
export class WorkLogService {
  constructor(
    @InjectRepository(WorkLog)
    private readonly repo: Repository<WorkLog>,
  ) {}

  create(dto: CreateWorkLogDto): Promise<WorkLog> {
    const log = this.repo.create({
      ...dto,
    });
    return this.repo.save(log);
  }

  findAll(userId: number): Promise<WorkLog[]> {
    return this.repo.find({
      where: { userId },
      order: { date: 'DESC' }
    });
  }

  async findOne(id: number): Promise<WorkLog> {
    const log = await this.repo.findOne({ where: { id } });
    if (!log) throw new NotFoundException(`WorkLog with ID ${id} not found`);
    return log;
  }

  async update(id: number, dto: UpdateWorkLogDto): Promise<WorkLog> {
    const log = await this.findOne(id);
    Object.assign(log, dto);
    return this.repo.save(log);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`WorkLog with ID ${id} not found`);
    }
  }
}

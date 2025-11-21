import { Module } from '@nestjs/common';
import { TaskManagerService } from './task-manager.service';
import { TaskManagerController } from './task-manager.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TaskManager } from './entities/task-manager.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TaskManagerController],
  providers: [TaskManagerService],
  imports: [AuthModule, TypeOrmModule.forFeature([TaskManager])],
})
export class TaskManagerModule {}

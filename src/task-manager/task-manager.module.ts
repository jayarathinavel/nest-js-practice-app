import { Module } from '@nestjs/common';
import { TaskManagerService } from './task-manager.service';
import { TaskManagerController } from './task-manager.controller';

@Module({
  controllers: [TaskManagerController],
  providers: [TaskManagerService],
})
export class TaskManagerModule {}

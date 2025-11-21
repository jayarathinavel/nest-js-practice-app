import { Module } from '@nestjs/common';
import { WorkLogService } from './work-log.service';
import { WorkLogController } from './work-log.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkLog } from './entities/work-log.entity';

@Module({
  controllers: [WorkLogController],
  providers: [WorkLogService],
  imports: [AuthModule, TypeOrmModule.forFeature([WorkLog])],
})
export class WorkLogModule {}

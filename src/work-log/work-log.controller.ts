import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WorkLogService } from './work-log.service';
import { CreateWorkLogDto } from './dto/create-work-log.dto';
import { UpdateWorkLogDto } from './dto/update-work-log.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { User } from 'src/auth/user.decorator';

@UseGuards(JwtGuard)
@Controller('work-log')
export class WorkLogController {
  constructor(private readonly workLogService: WorkLogService) {}

  @Post()
  create(@User('sub') userId: number, @Body() dto: CreateWorkLogDto) {
    dto.userId = userId;
    return this.workLogService.create(dto);
  }

  @Get()
  findAll(@User('sub') userId: number) {
    return this.workLogService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWorkLogDto) {
    return this.workLogService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workLogService.remove(+id);
  }
}

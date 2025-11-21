import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TaskManagerService } from './task-manager.service';
import { CreateTaskManagerDto } from './dto/create-task-manager.dto';
import { UpdateTaskManagerDto } from './dto/update-task-manager.dto';
import { JwtGuard } from 'src/auth/jwt.guard';
import { User } from 'src/auth/user.decorator';

@UseGuards(JwtGuard)
@Controller('task-manager')
export class TaskManagerController {
  constructor(private readonly taskManagerService: TaskManagerService) {}

  @Post()
  create(@User('sub') userId: number, @Body() createTaskManagerDto: CreateTaskManagerDto) {
    createTaskManagerDto.userId = userId;
    return this.taskManagerService.create(createTaskManagerDto);
  }

  @Get()
  findAll(@User('sub') userId: number) {
    return this.taskManagerService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskManagerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskManagerDto: UpdateTaskManagerDto,
  ) {
    return this.taskManagerService.update(id, updateTaskManagerDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.taskManagerService.remove(id);
    return { message: `Task with ID ${id} deleted` };
  }
}

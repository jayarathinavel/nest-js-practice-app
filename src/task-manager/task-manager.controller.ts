import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskManagerService } from './task-manager.service';
import { CreateTaskManagerDto } from './dto/create-task-manager.dto';
import { UpdateTaskManagerDto } from './dto/update-task-manager.dto';

@Controller('task-manager')
export class TaskManagerController {
  constructor(private readonly taskManagerService: TaskManagerService) {}

  @Post()
  create(@Body() createTaskManagerDto: CreateTaskManagerDto) {
    return this.taskManagerService.create(createTaskManagerDto);
  }

  @Get()
  findAll() {
    return this.taskManagerService.findAll();
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

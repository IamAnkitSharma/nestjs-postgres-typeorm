import { Get, Param, ParseIntPipe, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';

import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { Query } from '@nestjs/common';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }


  @Get()
  async getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  addTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.deleteTaskById(id);
  }
  @Patch('/:id/status')
  async updateTaskStatusById(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return await this.tasksService.updateTaskStatusById(id, status);
  }


}

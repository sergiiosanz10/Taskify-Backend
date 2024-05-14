import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TaskResponse } from './interfaces/task-response';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }


  @Post('/tareas-asignadas')
  newTask(@Body() createTaskDto: CreateTaskDto) {
    return this.dashboardService.newTask(createTaskDto);
  }


  @UseGuards(AuthGuard)
  @Get('load-tasks')
  getTasks(@Request() req: Request): Promise<Task[]> {
    const user = req['user'] as User;
    if (!user) {
      throw new Error('User not found in request');
    }
    return this.dashboardService.getTasks(user);
  }


  @UseGuards(AuthGuard)
  @Patch('tareas-asignadas/:taskId')
  async modifyTask(@Param('taskId') taskId: string, @Body() updateTaskDto: CreateTaskDto): Promise<TaskResponse> {

    try {
      console.log(updateTaskDto);
      return await this.dashboardService.modifyTask(taskId, updateTaskDto);
    } catch (error) {
      console.error(error);
      throw new HttpException('Error modifying task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('tareas-asignadas/:taskId')
  async deleteTask(@Param('taskId') taskId: string) {
    try {
      await this.dashboardService.deleteTask(taskId);
    } catch (error) {
      console.error(error);
      throw new HttpException('Error deleting task', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard)
  @Delete('gestion/:id')
  async deleteUser(@Param('id') id: string) {
    try {
      await this.dashboardService.deleteUser(id);
    } catch (error) {
      console.log(id);
      console.error(error);
      throw new HttpException('Error deleting user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @Get('load-tasks')
  // async loadTaks(): Promise<Task[]> {
  //   return this.dashboardService.findAll();
  // }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dashboardService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
  //   return this.dashboardService.update(+id, updateDashboardDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dashboardService.remove(+id);
  // }
}

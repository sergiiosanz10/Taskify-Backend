import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { User } from 'src/auth/entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

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


  @Delete('tareas-asignadas/:taskId')
  async deleteTask(@Param('taskId') taskId: string) {
    try {
      await this.dashboardService.deleteTask(taskId);
    } catch (error) {
      console.error(error);
      throw new HttpException('Error deleting task', HttpStatus.INTERNAL_SERVER_ERROR);
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

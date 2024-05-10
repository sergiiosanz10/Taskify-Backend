import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskResponse } from './interfaces/task-response';
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

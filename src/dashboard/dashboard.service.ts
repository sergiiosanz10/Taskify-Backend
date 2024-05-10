import {  Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TaskResponse } from './interfaces/task-response';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class DashboardService {

  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
  ) { }

  async newTask(createTaskDto: CreateTaskDto): Promise<TaskResponse> {

    try {
      const taskData = createTaskDto;

      const newTask = new this.taskModel({
        ...taskData
      });

      await newTask.save();

      return newTask;

    } catch (error) {
      throw new InternalServerErrorException('Something terrible happen!!!')
    }
  }




  findAll() {
    return `This action returns all dashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}

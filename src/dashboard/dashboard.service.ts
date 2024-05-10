import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) { }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const taskData = createTaskDto;


      const newTask = new this.taskModel({
        ...taskData
      });

      await newTask.save();

      return newTask;

    } catch (error) {
      console.error(error); // Log the error
      throw error; // Throw the original error
    }
  }


  async newTask(createTaskDto: CreateTaskDto): Promise<TaskResponse> {

    const task = await this.createTask(createTaskDto);

    return {
      userId: task.userId,
      label: task.label,
      name: task.name,
      description: task.description,
      time_start: task.time_start,
      time_end: task.time_end,
      date: task.date,
      color: task.color,
      status: task.status
    }

  }

  async getTasks(user: User): Promise<TaskResponse[]> {
    try {
      if (!user) {
        throw new Error('User is undefined');
      }
      console.log(`Fetching tasks for user: ${user._id}`);
      const tasks: Task[] = await this.taskModel.find({ userId: user._id }).exec();
      return tasks.map((task: Task) => ({
        userId: user._id,
        label: task.label,
        name: task.name,
        description: task.description,
        time_start: task.time_start,
        time_end: task.time_end,
        date: task.date,
        color: task.color,
        status: task.status
      }));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  findOne(id: number) {
    return this.taskModel.find().exec();
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}

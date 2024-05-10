import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entities/task.entity';
import { User, UserSchema } from '../auth/entities/user.entity';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema
      },
      {
        name: User.name, 
        schema: UserSchema
      }
    ]),
  ]  
})
export class DashboardModule {}
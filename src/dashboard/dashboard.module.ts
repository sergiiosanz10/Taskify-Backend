import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entities/task.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/auth/entities/user.entity';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, AuthGuard],
  imports: [
    AuthModule, // AuthModule debe ser importado aquí
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
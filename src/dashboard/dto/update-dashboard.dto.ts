import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateDashboardDto extends PartialType(CreateTaskDto) {}

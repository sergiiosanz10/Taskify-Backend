import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {

    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    label: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    time_start: string;

    @IsOptional()
    @IsString()
    time_end: string;

    @IsBoolean()
    status: boolean;

    @IsOptional()
    @IsString()
    date: string;

    @IsOptional()
    @IsString()
    color: string;






}

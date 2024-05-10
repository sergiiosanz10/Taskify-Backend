import { IsBoolean, IsString } from "class-validator";

export class CreateTaskDto {


    @IsString()
    label: string;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    time_start: string;

    @IsString()
    time_end: string;

    @IsString()
    date: string;

    @IsString()
    color: string;






}

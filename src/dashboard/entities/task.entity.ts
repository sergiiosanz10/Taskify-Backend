import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Task {


    @Prop({ unique: true, required: true })
    taskId: string;
    
    @Prop({ unique: true, required: true })
    userId: string;

    @Prop()
    label: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;

    @Prop()
    time_start?: string;

    @Prop()
    time_end?: string;

    @Prop()
    date?: string;

    @Prop()
    color?: string;
    
    @Prop({ default: false })
    status: boolean;

}

export const TaskSchema = SchemaFactory.createForClass( Task )
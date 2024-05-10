import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Task {

    _taskId?: string;
    
    @Prop()
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
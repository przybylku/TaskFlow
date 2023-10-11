import {IsNotEmpty, Allow, IsEnum, IsString} from 'class-validator'
import { TaskPriority, TaskStatus } from './tasks.schema';
import * as mongoose from "mongoose";
export class taskCreateDTO {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    @IsEnum(TaskPriority)
    priority: TaskPriority
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus
    @Allow()
    description: string;
}
export class taskUpdateDTO {
    @IsNotEmpty()
    id: mongoose.Types.ObjectId;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    @IsEnum(TaskPriority)
    priority: TaskPriority
    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus
    @Allow()
    description: string;
}

export class taskCommentDTO {
    @IsNotEmpty()
    @IsString()
    task: mongoose.Types.ObjectId;
    @IsNotEmpty()
    @IsString()
    user: mongoose.Types.ObjectId;
    @IsNotEmpty()
    @IsString()
    content: string
}
export class taskCommentUpdateDTO {
    @IsNotEmpty()
    id: mongoose.Types.ObjectId;
    @IsNotEmpty()
    @IsString()
    content: string
}

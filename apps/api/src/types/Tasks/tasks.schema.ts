import { HydratedDocument } from "mongoose";
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Board } from "../Board.schema";
// export type Task = {
//   title: string;
//   created_date: Date | string;
//   board: any; // do dodania id board
//   priority: TaskPriority;
//   status: TaskStatus;
//   description?: string | undefined
//   comments?: string[] | undefined
// };
export enum TaskStatus {
    ON_TIME,
    DANGER,
    DELAYED,

}

export enum TaskPriority {
  LOW,
  MID,
  HIGH,
  FIRE,
}


export type TaskDocument = HydratedDocument<Task>

@Schema({_id: true, timestamps: true})
export class Task {
  @Prop()
  title: string;
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Board"})
  board: Board
  @Prop({type: String, enum: TaskPriority, default: TaskPriority.MID})
  priority: TaskPriority
  @Prop({type: String, enum: TaskStatus, default: TaskStatus.ON_TIME})
  status: TaskStatus
  @Prop({required: false})
  description?: string;
  @Prop({required: false, type: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]})
  comments?: Comment[]
}

export const TaskSchema = SchemaFactory.createForClass(Task)
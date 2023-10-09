import { HydratedDocument } from "mongoose";
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Task } from "./Tasks/tasks.schema";
import { User } from "./User.Schema";

export type BoardDocument = HydratedDocument<Board>

@Schema({timestamps: true, id: true})
export class Board {
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "User"})
    user: User;
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}]})
    tasks: Task[]
}

export const BoardSchema = SchemaFactory.createForClass(Board)
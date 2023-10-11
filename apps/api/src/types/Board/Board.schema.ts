import { HydratedDocument } from "mongoose";
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import * as mongoose from 'mongoose'


export type BoardDocument = HydratedDocument<Board>

@Schema({timestamps: true, id: true})
export class Board {
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "User"})
    user: mongoose.Types.ObjectId;
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}]})
    tasks: mongoose.Types.ObjectId[]
}

export const BoardSchema = SchemaFactory.createForClass(Board)
import { HydratedDocument } from "mongoose";
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Board } from "./Board.schema";


export type UserDocument = HydratedDocument<User>
@Schema({_id: true, timestamps: true})
export class User {
    @Prop()
    username: string;
    @Prop()
    email: string;
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: "Board"})
    Board: Board
}


export const UserSchema = SchemaFactory.createForClass(User)
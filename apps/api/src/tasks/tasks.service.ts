import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Task, TaskComment} from "../types/Tasks/tasks.schema";
import {Model} from "mongoose";
import {taskCommentDTO, taskCommentUpdateDTO, taskCreateDTO, taskUpdateDTO} from "../types/Tasks/tasks.dto";
import {User} from "../types/Users/User.schema";
import {Board} from "../types/Board/Board.schema";
import * as mongoose from "mongoose";

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskDB: Model<Task>, @InjectModel(Board.name) private boardDB: Model<Board>, @InjectModel(TaskComment.name) private commentDB: Model<TaskComment>) {}

    async create(body: taskCreateDTO, user: User, board : string): Promise<any> {
        try {
            const task = new this.taskDB()
            task.title = body.title;
            task.board = board as unknown as mongoose.Schema.Types.ObjectId;
            task.priority = body.priority;
            task.status = body.status;
            task.description = body.description ? body.description : "";
            task.section = body.section ? body.section : "todo"

            const res = await task.save()
            if(!res._id){
                throw new HttpException("Error with task creating..", HttpStatus.BAD_REQUEST)
            }
            await this.boardDB.updateOne({_id: user.Board}, {$push: {tasks: res}})
            console.log(res)
            return res
        }catch (e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async addComment(body: taskCommentDTO): Promise<any> {
        try {
            const comment = new this.commentDB()
            comment.task = body.task;
            comment.user = body.user;
            comment.content = body.content;
            const saved_comment = await comment.save()

            await this.taskDB.updateOne({_id: body.task}, {$push: {comments: saved_comment}})
            console.log(`New comment on task, id: ${comment.task}`)
            return saved_comment

        }catch (e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async getTasks(user: User, board: string): Promise<Task[]>{
        try {
            const tasks = this.taskDB.find({board: board}).populate('comments')
            if(!tasks){
                throw new HttpException("Tasks not found", HttpStatus.NOT_FOUND)
            }
            return tasks
        }catch (e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async getTaskById(user: User, id: string){
        try {
            const task = this.taskDB.findOne({board: user.Board, _id: id}).populate('comments')
            if(!task){
                throw new HttpException("Task not Found", HttpStatus.NOT_FOUND)
            }
            return task
        }catch (e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async updateTask(body: taskUpdateDTO, user: User){
        try {
            const filtred = {title: body.title, priority: body.priority, status: body.status, description: body.description, section: body.section ? body.section : "todo"}
            const updated = await this.taskDB.updateOne({_id: body.id, board: user.Board}, {$set: filtred })
            if(updated.modifiedCount < 1){
                throw new HttpException("Task not updated or not found", HttpStatus.NOT_MODIFIED)
            }
            return updated
        }catch (e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async updateComment(body: taskCommentUpdateDTO, user: User){
        try {
            const updatedComment = await this.commentDB.updateOne({_id: body.id}, {$set: {content: body.content}})
            if(updatedComment.modifiedCount < 1){
                throw new HttpException('Comment not updated or not found', HttpStatus.NOT_MODIFIED)
            }
            return updatedComment
        }catch (e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async deleteTask(id: mongoose.Types.ObjectId, user: User) {
        try {
            const deleted = await this.taskDB.deleteOne({board: user.Board, _id: id})
            if(!deleted.acknowledged){
                throw new HttpException("Task not deleted", HttpStatus.SERVICE_UNAVAILABLE)
            }
            return deleted
        }catch (e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async deleteComment(id: mongoose.Types.ObjectId, user: User){
        try {
            const deleted = await this.commentDB.deleteOne({_id: id})
            if(!deleted.acknowledged){
                throw new HttpException("Comment not deleted", HttpStatus.SERVICE_UNAVAILABLE)
            }
            return deleted
        }catch (e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

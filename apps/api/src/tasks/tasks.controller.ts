import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Res, UseGuards} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {taskCommentDTO, taskCommentUpdateDTO, taskCreateDTO, taskUpdateDTO} from "../types/Tasks/tasks.dto";
import {Response} from "express";
import {AuthGuard} from "@nestjs/passport";
import {getUser} from "../decorators/user.decorator";
import {User} from "../types/Users/User.schema";
import {Task} from "../types/Tasks/tasks.schema";
import * as mongoose from "mongoose";

@Controller('tasks')
export class TasksController {
    constructor(@Inject(TasksService) private taskService : TasksService) {
    }
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createTask(@Body() body : taskCreateDTO, @getUser() user: User, @Res() res: Response): Promise<any> {
        const data = await this.taskService.create(body, user)
        res.json(data)
    }
    @Post('comment')
    @UseGuards(AuthGuard('jwt'))
    async addComment(@Body() body: taskCommentDTO, @getUser() user : User, @Res() res: Response): Promise<any> {
        const data = await this.taskService.addComment(body)
        res.json(data)
    }
    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getAllUserTasks(
        @getUser() user: User
        ,@Res() res: Response): Promise<Task[]>{
        const tasks = await this.taskService.getTasks(user)
        res.json(tasks)
        return tasks
    }
    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async getOneUserTask(
        @Param('id') id: string,
        @getUser() user: User,
        @Res() res: Response
    ) {
        const task = await this.taskService.getTaskById(user, id)
        res.json(task)
        return task
}
    @Put()
    @UseGuards(AuthGuard('jwt'))
    async updateOneTask(
        @getUser() user: User,
        @Res() res: Response,
        @Body() body: taskUpdateDTO
    ){
        const updated = await this.taskService.updateTask(body, user)
        res.json(updated)
        return updated;
    }
    @Put('/comment')
    @UseGuards(AuthGuard('jwt'))
    async updateCommentInTask(
        @getUser() user: User,
        @Res() res: Response,
        @Body() body : taskCommentUpdateDTO
    ) {
        const updatedComment = await this.taskService.updateComment(body, user)
        res.json(updatedComment)
        return updatedComment
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deletedTask(
        @Param('id') id: mongoose.Types.ObjectId,
        @getUser() user: User,
        @Res() res: Response,
    ){
        const deleted = await this.taskService.deleteTask(id, user)
        res.json(deleted)
        return deleted
    }
    @Delete('/comment/:id')
    @UseGuards(AuthGuard('jwt'))
    async deletedComment(
        @Param('id') id: mongoose.Types.ObjectId,
        @getUser() user: User,
        @Res() res: Response,
    ){
        const deleted = await this.taskService.deleteComment(id, user)
        res.json(deleted)
        return deleted
    }
}
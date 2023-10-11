import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import {CommentSchema, Task, TaskComment, TaskSchema} from 'src/types/Tasks/tasks.schema';
import { Board, BoardSchema } from 'src/types/Board/Board.schema';
import {PassportModule} from "@nestjs/passport";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}, {name: Board.name, schema: BoardSchema}, {name: TaskComment.name, schema: CommentSchema}]), PassportModule, UsersModule
  ],
  controllers: [TasksController],
  providers: [TasksService,]
})
export class TasksModule {}

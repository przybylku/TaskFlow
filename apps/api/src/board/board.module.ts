import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema, Task, TaskComment, TaskSchema } from 'src/types/Tasks/tasks.schema';
import { Board, BoardSchema } from 'src/types/Board/Board.schema';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/types/Users/User.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}, {name: Board.name, schema: BoardSchema}, {name: User.name, schema: UserSchema}, {name: TaskComment.name, schema: CommentSchema}]), PassportModule, UsersModule
  ],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}

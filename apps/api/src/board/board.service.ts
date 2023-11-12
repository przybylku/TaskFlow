import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board } from 'src/types/Board/Board.schema';
import { boardCreateDTO } from './board.controller';
import { User } from 'src/types/Users/User.schema';

@Injectable()
export class BoardService {
    constructor(@InjectModel(Board.name) private BoardDB: Model<Board>, @InjectModel(User.name) private UserDB: Model<User>) {}
    async createBoard(boardDTO: boardCreateDTO, user: User) {
        try {
            const _user = await this.UserDB.findOne({email: user.email})
            const board = new this.BoardDB()
            board.name = boardDTO.name;
            board.user = _user._id

            this.UserDB.updateOne({email: user.email}, {$push: {Board: board}})
        }catch (e) {

        }
    }
}

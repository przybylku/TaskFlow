import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
            const _user = await this.UserDB.findOne({email: user?.email})
            console.log(_user.email)
            const board = new this.BoardDB()
            board.name = boardDTO.name;
            board.user = _user?._id
            await board.save()
            const updated = await this.UserDB.updateOne({email: _user?.email}, {$push: {Board: board}})
            if(!updated){
                throw new HttpException("Error with board creating..", HttpStatus.BAD_REQUEST)
            }
            return board
        }catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

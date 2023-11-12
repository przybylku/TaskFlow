import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { BoardService } from './board.service';
import { getUser } from 'src/decorators/user.decorator';
import { User } from 'src/types/Users/User.schema';
import { Response } from 'express';

export class boardCreateDTO {
    name: string;}

@Controller('board')
export class BoardController {
    constructor(@Inject(BoardService) private boardService: BoardService) {}
    @Post()
    async createBoard(@getUser() user: User, @Res() res: Response, @Body() body: boardCreateDTO) {
        const returned = this.boardService.createBoard(body, user)
        return res.json(returned)
    }
}

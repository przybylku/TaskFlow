import { Body, Controller, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { getUser } from 'src/decorators/user.decorator';
import { User } from 'src/types/Users/User.schema';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { IsNotEmpty } from 'class-validator';

export class boardCreateDTO {
    @IsNotEmpty()
    name: string;}

@Controller('board')
export class BoardController {
    constructor(@Inject(BoardService) private boardService: BoardService) {}
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createBoard(@getUser() user: User, @Res() res: Response, @Body() body: boardCreateDTO) {
        const returned = await this.boardService.createBoard(body, user)
        return res.json(returned)
    }
}

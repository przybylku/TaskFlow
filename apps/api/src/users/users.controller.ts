import { Controller, Body, Post,  Res, Inject, UseGuards, Get} from '@nestjs/common';
import { loginDTO, registerDTO } from '../types/Users/users.dto';
import { Response } from 'express'
import { UsersService } from './users.service';
import { User } from 'src/types/Users/User.schema';
import { getUser } from 'src/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
@Controller('user')
export class UsersController {
    constructor(@Inject(UsersService) private userService: UsersService){}
    @Post('register')
    async register(@Body() body: registerDTO, @Res() res: Response ){
        const data = await this.userService.register(body)
        res.json(data)
    }
    @Post('login')
    async login(@Body() body: loginDTO, @Res() res: Response){
        const data = await this.userService.login(body)
        res.json(data)
    }
    @Post('refresh')
    async refresh(@Body() body: {refreshToken: string}, @getUser() user: User , @Res() res: Response){
        const data = await this.userService.refresh(user)
        res.json(data)
    }
    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getuser(@getUser() user: User, @Res() res: Response){
        const data = await this.userService.getUser(user)
        res.json(data)
    }
}

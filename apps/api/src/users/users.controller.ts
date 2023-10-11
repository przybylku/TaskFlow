import { Controller, Body, Post,  Res, Inject} from '@nestjs/common';
import { loginDTO, registerDTO } from 'src/types/Users/users.dto';
import {Response} from 'express'
import { UsersService } from './users.service';
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
}

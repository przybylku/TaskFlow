import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board } from '../types/Board/Board.schema';
import { User } from '../types/Users/User.schema';
import { AuthUser } from '../types/Users/user.types';
import { loginDTO, registerDTO } from '../types/Users/users.dto';
import { hash } from '../utils/hash';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private User: Model<User>,
        @InjectModel(Board.name) private Board: Model<Board>,
        private jwtService: JwtService
    ){}
    private createToken(user: User) {
        const accessToken = this.jwtService.sign({email: user.email}, {
            secret: process.env.SECRET_JWT,
            expiresIn: 60 * 60 * 12
        })
        return accessToken;
    }

    async register(body: registerDTO): Promise<AuthUser> {
        try { 
            const check = await this.User.findOne({email: body.email})
            if(check?._id){
                throw new HttpException("Invalid email", HttpStatus.BAD_REQUEST)
            }
            console.log(process.env.KEY_FOR_HASH)
            const board = await new this.Board()
            const user = await new this.User();
            user.email = body.email;
            user.password = hash(body.password)
            console.log(user._id, board._id)
            user.username = body.username
            board.user = user._id
            const res = await board.save()
            if(res.errors){
                throw new HttpException(res.errors.message, HttpStatus.INTERNAL_SERVER_ERROR)
            }
            user.Board = board.id;
            const _res =  await user.save()
            if(_res.errors){
                console.error(_res.errors)
                throw new HttpException("Database server error", HttpStatus.INTERNAL_SERVER_ERROR)
            }
            const token = this.createToken(_res)
            return {
                accessToken: token,
                expiresIn: 60 * 60 * 12,
                user: _res
            }
        }catch(e){
            throw new HttpException(`${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    public async validate(payload: any): Promise<any> {
        try {
          const user = await this.User.findOne({
            email: payload.email,
          });
          if (!user) {
            throw new HttpException('Token invalid.', HttpStatus.UNAUTHORIZED);
          }
          return user;
        } catch (e) {}
      }
    async refresh(user: User){
        const _user = await this.User.findOne({_id: user.email})
        const token = this.createToken(_user)
        return {
            accessToken: token,
            expiresIn: 60 * 60 * 12,
            _user
        }
    }
    async login(body: loginDTO): Promise<AuthUser>{
        try {
            const check = await this.User.findOne({email: body.email, password: hash(body.password.toString())})
            if(!check?._id){
                throw new HttpException("That user not exists.", HttpStatus.UNAUTHORIZED)
            }
            const token = this.createToken(check)

            return {
                accessToken: token,
                expiresIn: 60 * 60 * 12,
                user: check
            }
        }catch(e){
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

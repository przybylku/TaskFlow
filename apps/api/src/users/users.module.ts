import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/types/Users/User.schema';
import { Board, BoardSchema } from 'src/types/Board/Board.schema';
import {JwtModule} from '@nestjs/jwt'
import * as config from "../../config.json";
import {JwtStrategy} from "./jwt.strategy";
@Module({
  imports: [
    PassportModule.register({
      // defaultStrategy: "jwt",
      property: "user",
      session: false,
    }),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: Board.name, schema: BoardSchema}]),
    JwtModule.register({
      global: true,
      secret: '' + config.SECRET_JWT,
      signOptions: {
        expiresIn: 60 * 60 * 12
      }
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy]
})
export class UsersModule {}

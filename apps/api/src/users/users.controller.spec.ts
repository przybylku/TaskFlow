import { Test, TestingModule } from "@nestjs/testing";
import {UsersController} from "./users.controller";
import {Request, Response} from "express";
import {UsersService} from "./users.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "../types/Users/User.schema";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {Board, BoardSchema} from "../types/Board/Board.schema";
import {PassportModule} from "@nestjs/passport";
import * as config from "../../config.json";


describe("UserController", () => {
    let controller: UsersController;

    const requestMock = {
        body: {}
    } as unknown as Request;

    const statusResponseMock = {
        send: jest.fn((x) => x)
    }
    const responseMock = {
        status: jest.fn((x) => statusResponseMock),
        send: jest.fn((x) => x)
    } as unknown as Response;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PassportModule.register({
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
                }), User],
            controllers: [UsersController],
            providers: [UsersService]
        }).compile()

        controller = module.get<UsersController>(UsersController)
    })

    it("should be defined", () => {
        expect(controller).toBeDefined();
    })
    describe('register User', () => {
        it('should return a HttpException', () => {
            controller.register({email: '', password: "", username: ''}, responseMock)
            expect(responseMock.status).toHaveBeenCalledWith(400)
        })
    })
})
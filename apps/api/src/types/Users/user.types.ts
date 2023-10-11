import { User } from "./User.schema"


export type AuthUser = {
    accessToken: string,
    expiresIn: number,
    user: User
}
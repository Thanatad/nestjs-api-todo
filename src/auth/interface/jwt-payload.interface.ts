import { UserInfo } from "../../user/entities/user-info.entity";

export interface JwtPayload {
    username: string
    user_info: UserInfo
}
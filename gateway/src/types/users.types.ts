import { ApiProperty } from "@nestjs/swagger";
import { IBase, IBaseExtended } from "./IBase"
import { ProjectsResponse } from "./projects.types";

export class UserResponse extends IBaseExtended {
    @ApiProperty({ description: 'Email пользователя', example: "Password@123" })
    email: string;
    @ApiProperty({ description: 'Имя пользователя', example: "admin" })
    username: string;
}

export class UpdateUserResponse {
    @ApiProperty({ description: 'Email пользователя', example: "Password@123" })
    email: string;
    @ApiProperty({ description: 'Имя пользователя', example: "admin" })
    username: string;
}

export class User extends UserResponse {
    @ApiProperty({ description: 'Пароль пользователя', example: "Password@123" })
    password: string;
}

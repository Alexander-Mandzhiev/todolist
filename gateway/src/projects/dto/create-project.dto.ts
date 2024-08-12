import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString, IsNotEmpty, Length } from "class-validator"
import { PROJECT_RULE_LENGTH } from "src/config/util"

export class ProjectDto {
    @ApiProperty({ description: 'Название проекта', example: "Project 1" })
    @IsNotEmpty()
    @IsString()
    @Length(4, 150, { message: PROJECT_RULE_LENGTH })
    readonly name: string

    @ApiProperty({ description: 'Описсание проекта', example: "1 проект - описание" })
    @IsOptional()
    @IsString()
    readonly description?: string
}

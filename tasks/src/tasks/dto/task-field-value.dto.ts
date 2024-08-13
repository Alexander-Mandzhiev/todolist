import { IsNotEmpty, IsOptional, IsString, Validate } from "class-validator"
import { IsNumberOrString } from "src/config/validation"



export class ProjectId {

    @IsNotEmpty()
    @IsString()
    readonly projectId: string

    @IsNotEmpty()
    @IsString()
    readonly userId: string
}

export class TaskFieldValueDto extends ProjectId {
    @IsOptional()
    @Validate(IsNumberOrString)
    readonly value: number | string

    @IsNotEmpty()
    @IsString()
    readonly taskFieldId: string

    @IsNotEmpty()
    @IsString()
    readonly taskId: string
}
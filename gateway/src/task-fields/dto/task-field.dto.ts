import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { EnumTypeField, TypeField } from "src/types/projectFields.types"


export class ProjectId {
    @ApiProperty({ description: 'Уникальный идентификатор на задачу', example: "clxc46zrl00016z0jral1rjan" })
    @IsNotEmpty()
    @IsString()
    projectId: string
}

export class UpdateTaskFieldDto extends ProjectId {
    @ApiProperty({ description: 'Описсание проекта', example: "Исполнитель" })
    @IsNotEmpty()
    @IsString()
    readonly name: string
}

export class TaskFieldDto extends UpdateTaskFieldDto {
    @ApiProperty({ description: 'Описсание проекта', example: "string | integer | enum" })
    @IsNotEmpty()
    @IsEnum(EnumTypeField)
    readonly field: TypeField
}

export class EnumValuesDto extends ProjectId {
    @ApiProperty({ description: 'Список значений', example: "Низкий,Средний,Высокий" })
    @IsNotEmpty()
    @IsString()
    values: string

    @ApiProperty({ description: 'Уникальный идентификатор на поле задачи', example: "clxhf60d40007et0jhbcil2vm" })
    @IsNotEmpty()
    @IsString()
    taskFieldId: string
}
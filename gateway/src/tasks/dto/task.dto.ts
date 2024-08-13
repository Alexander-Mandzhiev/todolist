import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsOptional, IsString, Length, Validate } from 'class-validator';
import { TASK_RULE_LENGTH } from "src/config/util";
import { IsNumberOrString } from "src/config/validation";


export class StatusIdDto {

    @ApiProperty({ description: 'Уникальный идентификатор проекта', example: "clx25gfmp00037r4g2jg2vete" })
    @IsNotEmpty()
    @IsString()
    readonly projectId?: string

    @ApiProperty({ description: 'Уникальный идентификатор проекта', example: "clx31ne1700013pzzcen2jla2" })
    @IsNotEmpty()
    @IsString()
    readonly statusId: string
}

export class TaskDto extends StatusIdDto {

    @ApiProperty({ description: 'Название задачи', example: "to do" })
    @IsNotEmpty()
    @IsString()
    @Length(5, 150, { message: TASK_RULE_LENGTH })
    readonly name: string

    @ApiProperty({ description: 'Описсание задачи', example: "Какое-то описание ..." })
    @IsOptional()
    @IsString()
    readonly description?: string

    @ApiProperty({ description: 'Значение полей задачи', example: "{}" })
    readonly data: FieldValuesDTO[]
}

export class FieldValuesDTO {
    @ApiProperty({ description: 'Значение поля задачи', example: "Исполнитель. В случае дорабвления значения из списка, берём id поля - clycqvk6u0001ore3c4smayhi" })
    @IsOptional()
    @Validate(IsNumberOrString)
    value: number | string

    @ApiProperty({ description: 'Уникальный идентификатор на поле задачи', example: "clxfvplou0001lbfs22szxu7v" })
    @IsNotEmpty()
    @IsString()
    taskFieldId: string
}

export class UpdateOrderDto extends StatusIdDto {
    @ApiProperty({
        description: 'Порядковые номер столбца статуса задачи',
        example: [
            "clx31nibq00033pzz8cck5u2s",
            "clx31ne1700013pzzcen2jla2"]
    })
    @IsOptional()
    @IsArray()
    readonly ids?: [string]
}
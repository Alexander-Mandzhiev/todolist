import { ApiProperty } from "@nestjs/swagger"
import { FindOneId, IBase, ProjectId } from "./IBase"

export type TypeField = {
    string: 'string';
    integer: 'integer';
    enum: 'enum';
}

export enum EnumTypeField {
    'string',
    'integer',
    'enum'
}

export class CreateProjectFieldResponse extends IBase {

    @ApiProperty({ description: 'Название поля задачи', example: "Исполнитель" })
    name: string

    @ApiProperty({ description: 'Уникальный идентификатор проекта', example: "clx25gfmp00037r4g2jg2vete" })
    projectId: string

    @ApiProperty({ description: 'список', example: "string | integer | enum" })
    field: TypeField
}


export class ProjectFieldsResponse {
    @ApiProperty({
        example: [
            {
                "id": "clycnrm5h0001di9lilvz22gi",
                "name": "Время выполнения - upd",
                "field": "integer",
                "taskFieldsEnumValue": []
            },
            {
                "id": "clycnxef90003di9lkb8slxlq",
                "name": "Исполнитель",
                "field": "string",
                "taskFieldsEnumValue": []
            },
            {
                "id": "clyco1fyl000bdi9lb4sqmfwa",
                "name": "Приоритет выполнения",
                "field": "enum",
                "taskFieldsEnumValue": [
                    {
                        "id": "clycrqrgc000111w54opn13tw",
                        "name": "Низкий",
                        "taskFieldId": "clyco1fyl000bdi9lb4sqmfwa"
                    },
                    {
                        "id": "clycrqrgc000311w50xvsb3l5",
                        "name": "Средний",
                        "taskFieldId": "clyco1fyl000bdi9lb4sqmfwa"
                    },
                    {
                        "id": "clycrqrgc000511w58ssga5vm",
                        "name": "Высокий",
                        "taskFieldId": "clyco1fyl000bdi9lb4sqmfwa"
                    }
                ]
            },
            {
                "id": "clycodh9z0001gy83e9tn7wlh",
                "name": "Срок выполнения",
                "field": "enum",
                "taskFieldsEnumValue": [
                    {
                        "id": "clycr94bo0001104kj9or5l5q",
                        "name": "1 час",
                        "taskFieldId": "clycodh9z0001gy83e9tn7wlh"
                    },
                    {
                        "id": "clycr94bo0003104k5ntaah41",
                        "name": "2 часа",
                        "taskFieldId": "clycodh9z0001gy83e9tn7wlh"
                    },
                    {
                        "id": "clycr94bo0005104ks6sl258q",
                        "name": "3 часа",
                        "taskFieldId": "clycodh9z0001gy83e9tn7wlh"
                    }
                ]
            }
        ]
    })
    response: [CreateProjectFieldResponse]
}

export class TaskFieldValues {
    @ApiProperty({ description: 'Значение поля задачи', example: "Исполнитель" })
    value: number | string
    @ApiProperty({ description: 'Уникальный идентификатор на поле задачи', example: "clxfvplou0001lbfs22szxu7v" })
    taskFieldId: string
    @ApiProperty({ description: 'Уникальный идентификатор на задачу', example: "clxc46zrl00016z0jral1rjan" })
    taskId: string
}

export class ResponseTaskIntValues {
    @ApiProperty({ description: 'Значение поля задачи', example: "2" })
    value: number
    @ApiProperty({ description: 'Уникальный идентификатор на поле задачи', example: "clxfvplou0001lbfs22szxu7v" })
    taskFieldId: string
}

export class ResponseTaskStrValues {
    @ApiProperty({ description: 'Значение поля задачи', example: "Исполнитель" })
    value: string
    @ApiProperty({ description: 'Уникальный идентификатор на поле задачи', example: "clxfvplou0001lbfs22szxu7v" })
    taskFieldId: string
}

export class ResponseCreateEnumValues extends IBase {
    @ApiProperty({ description: 'Название поля задачи', example: "Средний" })
    name: string
    @ApiProperty({ description: 'Уникальный идентификатор на поле задачи', example: "clxfvplou0001lbfs22szxu7v" })
    taskFieldId: string
}

export class ResponseEnum {
    @ApiProperty({
        example: [
            {
                "id": "clxhf653e0009et0jkw8e4sdu",
                "name": "Низкий",
                "taskFieldId": "clxhf60d40007et0jhbcil2vm"
            },
            {
                "id": "clxhf653e000bet0j99tnjpv8",
                "name": "Средний",
                "taskFieldId": "clxhf60d40007et0jhbcil2vm"
            },
            {
                "id": "clxhf653f000det0j881ktsap",
                "name": "Высокий",
                "taskFieldId": "clxhf60d40007et0jhbcil2vm"
            }
        ]
    })
    response: ResponseCreateEnumValues[]

}


export type SandingUpdateTaskFieldDto = FindOneId & {
    readonly name?: string
}

export type SandingCreateTaskFieldDto = ProjectId & {
    readonly name?: string
    readonly field?: TypeField
}

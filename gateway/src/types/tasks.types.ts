import { ApiProperty } from "@nestjs/swagger"
import { FindOneId, IBaseExtended, ProjectId } from "./IBase"
import { ResponseCreateEnumValues, ResponseTaskIntValues, ResponseTaskStrValues } from "./projectFields.types"

export class CreateTasksResponse extends IBaseExtended {
    @ApiProperty({ description: 'Название задачи', example: "to do" })
    name: string

    @ApiProperty({ description: 'Описсание задачи', example: "Какое-то описание ..." })
    description: string

    @ApiProperty({ description: 'Порядковые номер задачи', example: "1" })
    order: number
}

export class TasksResponse extends IBaseExtended {
    @ApiProperty({ description: 'Название задачи', example: "to do" })
    name: string

    @ApiProperty({ description: 'Описсание задачи', example: "Какое-то описание ..." })
    description: string

    @ApiProperty({
        example: [{
            "value": "Петр",
            "taskFieldId": "clxfx7ljv0001i7zd2toarvak"
        }]
    })
    taskStrValues: ResponseTaskStrValues

    @ApiProperty({
        example: [{
            "value": "1",
            "taskFieldId": "clxfx7ljv0001i7zd2toarvak"
        }]
    })
    taskIntValues: ResponseTaskIntValues

    @ApiProperty({
        example: {
            "value": "Средний",
            "taskFieldId": "clxhltfdv0008cbz4oh8opvqa"
        }
    })
    taskEnumValues: ResponseCreateEnumValues
}

export class UpdateOrderTasksResponse {
    @ApiProperty({
        example: [
            {
                "id": "clx31nibq00033pzz8cck5u2s",
                "createdAt": "2024-06-06T20:07:03.849Z",
                "name": "Сесть за работу",
                "description": "Сесть за работу, Дописать круд",
                "taskIntValues": [
                    {
                        "value": 2,
                        "taskFieldId": "clxfvplou0001lbfs22szxu7v"
                    }
                ],
                "taskStrValues": [
                    {
                        "value": "Петр",
                        "taskFieldId": "clxfx7ljv0001i7zd2toarvak"
                    }
                ],
                "taskEnumValues": [
                    {
                        "value": "Средний",
                        "taskFieldId": "clxhltfdv0008cbz4oh8opvqa"
                    }
                ]
            },
            {
                "id": "clx31ne1700013pzzcen2jla2",
                "createdAt": "2024-06-06T12:03:24.218Z",
                "name": "Сделать перерыв",
                "description": "Сделать перерыв описание 123",
                "taskIntValues": [],
                "taskStrValues": [],
                "taskEnumValues": []
            }
        ]
    })
    response: []
}

export type SandingTaskStatus = ProjectId & {
    readonly statusId?: string
}

export type SandingTaskStatusId = SandingTaskStatus & {
    readonly id?: string
}

export type SandingTask = {
    readonly name?: string
    readonly description?: string
}

export type CreateTaskDto = SandingTaskStatus & SandingTask
export type UpdateTaskDto = SandingTaskStatusId & SandingTask



export type UpdateTaskOrderDto = ProjectId & {
    readonly statusId: string
    readonly ids?: [string]
}
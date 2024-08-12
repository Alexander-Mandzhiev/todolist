import { ApiProperty } from "@nestjs/swagger";
import { FindOneProjectId, IBaseExtended, ProjectId, UserId } from "./IBase";
import { StatusesResponse } from "./statuses.types";

export class CreateProjectsResponse extends IBaseExtended {
    @ApiProperty({ description: 'Название проекта', example: "Project 1" })
    name: string

    @ApiProperty({ description: 'Описсание проекта', example: "1 проект - описание" })
    description: string

    @ApiProperty({ description: 'Уникальный идентификатор пользователя', example: "clx22fhxz0000frhk7ibh7o3o" })
    userId: string
}

export class ProjectsResponse extends CreateProjectsResponse {
    @ApiProperty({
        description: 'Имя пользователя', example: [
            {
                "id": "clxhlnbem0002cbz4mma242r4",
                "name": "Project 1",
                "description": "1 проект - описание",
                "createdAt": "2024-06-16T13:45:47.902Z",
                "taskFields": [
                    {
                        "id": "clxhltfdv0008cbz4oh8opvqa",
                        "name": "Приоритет",
                        "field": "enum",
                        "taskFieldsEnumValue": [
                            {
                                "id": "clxhltvih000acbz47su317y7",
                                "name": "Низкий"
                            },
                            {
                                "id": "clxhltvih000ccbz4obpph8oa",
                                "name": "Средний"
                            },
                            {
                                "id": "clxhltvih000ecbz4jxb6e6el",
                                "name": "Высокий"
                            }
                        ]
                    },
                    {
                        "id": "clxhlvanr000gcbz47ag7fv4d",
                        "name": "Исполнитель",
                        "field": "string",
                        "taskFieldsEnumValue": []
                    },
                    {
                        "id": "clxhlvrzq000icbz4n91byakc",
                        "name": "Время выполнения",
                        "field": "integer",
                        "taskFieldsEnumValue": []
                    }
                ],
                "statuses": [
                    {
                        "id": "clxhlopca0004cbz468d6bcsw",
                        "name": "in process",
                        "tasks": [
                            {
                                "id": "clxhlqasy0006cbz4m0xeujoe",
                                "createdAt": "2024-06-16T13:48:07.090Z",
                                "name": "Сделать Todo list",
                                "description": "Сделать Todo list - петпроект, стажировка"
                            }
                        ]
                    }
                ]
            }
        ]
    })
    statuses: StatusesResponse[]
}



export type SandUpdateProjectDto = FindOneProjectId & {
    readonly name?: string;
    readonly description?: string;
}

export type SandProjectDto = UserId & {
    readonly name?: string;
    readonly description?: string;
}
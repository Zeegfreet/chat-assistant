
export interface SingleIdDtoRaw {
    id: string | number
}

export interface SingleIdDtoModel {
    id: number
}

export interface SingleIdDtoMapper {
    to_dto(data: SingleIdDtoRaw): SingleIdDtoModel
}
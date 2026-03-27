
export interface AddUserDtoRaw {
    name: string;
    email: string;
    password: string;
}

export interface AddUserDtoModel {
    name: string;
    email: string;
    password: string;
}

export interface AddUserDtoMapper {
    to_dto(raw: AddUserDtoRaw): AddUserDtoModel
}

export interface UpdateUserDtoRaw {
    name?: string;
    avatar?: string;
    email?: string;
    password?: string;
    isActive?: boolean;
    isAdmin?: boolean;
    isBlocked?: boolean;
}

export interface UpdateUserDtoModel {
    name?: string;
    avatar?: string;
    email?: string;
    password?: string;
    isActive?: boolean;
    isAdmin?: boolean;
    isBlocked?: boolean;
}

export interface UpdateUserDtoMapper {
    to_dto(raw: UpdateUserDtoRaw): UpdateUserDtoModel
}
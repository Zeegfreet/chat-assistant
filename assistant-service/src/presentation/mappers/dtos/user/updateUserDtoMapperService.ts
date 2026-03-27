import { UpdateUserDtoMapper, UpdateUserDtoModel, UpdateUserDtoRaw } from "./updateUserDto";

export class UpdateUserDtoMapperService implements UpdateUserDtoMapper{

    to_dto(raw: UpdateUserDtoRaw): UpdateUserDtoModel {
        const parsedRaw = {
            name: raw.name?.trim(),
            avatar: raw.avatar,
            email: raw.email?.trim().toLowerCase(),
            password: raw.password?.trim(),
            isActive: raw.isActive,
            isAdmin: raw.isAdmin,
            isBlocked: raw.isBlocked,
        };

        const response = Object.fromEntries(Object.entries(parsedRaw).filter(pr => Object.keys(raw).some(rf => rf === pr[0])));

        return response;
    }
    
}
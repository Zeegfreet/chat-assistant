import { AddUserDtoMapper, AddUserDtoModel, AddUserDtoRaw } from "./addUserDto";

export class AddUserDtomapperService implements AddUserDtoMapper {
    to_dto(raw: AddUserDtoRaw): AddUserDtoModel {
        return {
            name: raw.name.trim(),
            email: raw.email.toLowerCase(),
            password: raw.password.replace(/\s+/g, "")
        };
    }

}
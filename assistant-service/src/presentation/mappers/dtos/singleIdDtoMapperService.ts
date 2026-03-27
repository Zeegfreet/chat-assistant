import { SingleIdDtoMapper, SingleIdDtoRaw, SingleIdDtoModel } from "./singleIdDto";

export class SingleIdDtoMapperService implements SingleIdDtoMapper {
    to_dto(data: SingleIdDtoRaw): SingleIdDtoModel {
        return {
            id: Number(data.id)
        };
    }
    
}
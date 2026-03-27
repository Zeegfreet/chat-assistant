import { MassIdsDtoMapper } from "./massIdsDto";

export class MassIdsDtoMapperService implements MassIdsDtoMapper {
    to_dto(data: MassIdsDtoMapper.Raw): MassIdsDtoMapper.Result {
        if(!Array.isArray(data.ids)) return [];
        const ids: unknown[] = data.ids;
        return ids
            .map((id) => {
                if(typeof id === "string" || typeof id === "number"){
                    return Number(id);
                }
            })
            .filter((id) => Number.isInteger(id)) as number[];
    }
}

import { SearchDtoMapper } from "./searchDtoMapper";

export class SearchDtoMapperService implements SearchDtoMapper{
    to_dto(raw: SearchDtoMapper.RawData): SearchDtoMapper.Result {
        let dto = {};
        if(raw.limit){
            dto = {
                ...dto,
                limit: Number(raw.limit)
            };
        } else {
            dto = {
                ...dto,
                limit: 100
            };
        }

        if(raw.page){
            dto = {
                ...dto,
                page: Number(raw.page)
            };
        } else {
            dto = {
                ...dto,
                page: 1
            };
        }

        if(raw.order){
            dto = {
                ...dto,
                order: raw.order
            };
        }

        if(raw.search){
            dto = {
                ...dto,
                search: String(raw.search)
            };
        }

        if(raw.filter){
            
            dto = {
                ...dto,
                filter: Object.fromEntries(
                    Object.entries(raw.filter).map(([key, value]) => {
                        if(value === "true" || value === "false"){
                            return [key, value === "true"];
                        }
                        return [key, value];
                    }))
            };
        }

        return dto;
    }
    
}
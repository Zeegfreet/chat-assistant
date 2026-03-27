import { SearchParams } from "@domain/index";

export interface SearchDtoMapper {
    to_dto(raw: SearchDtoMapper.RawData): SearchDtoMapper.Result
}

export namespace SearchDtoMapper {
    export type RawData = any
    export type Result = Partial<SearchParams>
}
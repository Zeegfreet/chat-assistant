
export interface DtoMapper<T = any, R = any>{
    to_dto(raw: DtoMapper.Raw<T>): DtoMapper.Dto<R>
}

export namespace DtoMapper{
    export type Raw<T> = T
    export type Dto<T> = T
}
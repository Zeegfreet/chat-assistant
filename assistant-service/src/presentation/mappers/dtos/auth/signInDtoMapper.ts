
export interface SignInDtoMapper {
    to_dto(input: SignInDtoMapper.Params): SignInDtoMapper.Result 
}

export namespace SignInDtoMapper {
    export type Params = {
        email: string,
        password: string
    }
    export type Result = {
        email: string,
        password: string
    }
}
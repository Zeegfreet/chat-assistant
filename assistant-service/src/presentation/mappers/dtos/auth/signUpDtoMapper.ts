
export interface SignUpDtoMapper {
    to_dto(input: SignUpDtoMapper.Input): SignUpDtoMapper.Result
}

export namespace SignUpDtoMapper {
    export type Input = {
        name: string;
        email: string;
        password: string;
    }
    export type Result = {
        name: string;
        email: string;
        password: string;
    }
}
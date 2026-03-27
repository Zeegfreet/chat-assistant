import { Role, SignUp } from "@domain/index";

export interface SignUpUserPresenterMapper {
    to_presenter(user: SignUpUserPresenterMapper.Input): SignUpUserPresenterMapper.Result
    to_presenters(users: SignUpUserPresenterMapper.Input[]): SignUpUserPresenterMapper.Result[]
}

export namespace SignUpUserPresenterMapper {
    export type Input = SignUp.Result

    export type Result = {
        id: number;
        name: string;
        email: string;
        roles: Role[];
        createdAt: Date;
        updatedAt: Date;
    }
}
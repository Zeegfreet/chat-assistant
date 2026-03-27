import { SignUpUserPresenterMapper } from "./signUpUserPresenterMapper";

export class HelperSignUpUserPresenterMapper implements SignUpUserPresenterMapper {

    to_presenter(user: SignUpUserPresenterMapper.Input): SignUpUserPresenterMapper.Result {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }

    to_presenters(users: SignUpUserPresenterMapper.Input[]): SignUpUserPresenterMapper.Result[] {
        return users.map(user => this.to_presenter(user));
    }
    
}
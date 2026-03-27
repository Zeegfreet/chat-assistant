import { UserPresenterMapper } from "./userPresenter";

export class UserPresenterMapperService implements UserPresenterMapper {

    to_presenter(raw: UserPresenterMapper.Payload): UserPresenterMapper.Presenter {
        return {
            id: raw.id,
            name: raw.name,
            email: raw.email,
            isActive: raw.isActive,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt
        };
    }

    to_presenters(raw: UserPresenterMapper.Payload[]): UserPresenterMapper.Presenter[] {
        return raw.map(data => this.to_presenter(data));
    }
    
}
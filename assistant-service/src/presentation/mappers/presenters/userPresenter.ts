import { User } from "@domain/index";

export interface UserPresenterMapper {
    to_presenter(user: UserPresenterMapper.Payload): UserPresenterMapper.Presenter
    to_presenters(users: UserPresenterMapper.Payload[]): UserPresenterMapper.Presenter[]
}

export namespace UserPresenterMapper {
    export type Payload = Omit<User, "password" | "deletedAt">
    export type Presenter = {
        id: number;
        name: string;
        email: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }
}
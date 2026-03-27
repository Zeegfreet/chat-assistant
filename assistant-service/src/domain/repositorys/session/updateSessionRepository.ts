import { Session } from "@domain/models/Session";

export interface UpdateSessionRepository {
    update(id: UpdateSessionRepository.SessionId, payload: UpdateSessionRepository.Payload): Promise<UpdateSessionRepository.Result>
}

export namespace UpdateSessionRepository {
    export type SessionId = string;
    export type Payload = Partial<Session>
    export type Result = Omit<Session, "user">
}
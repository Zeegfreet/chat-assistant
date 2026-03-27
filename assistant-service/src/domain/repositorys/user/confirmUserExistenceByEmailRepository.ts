
export interface ConfirmUserExistenceByEmailRepository  {
    verify(email: ConfirmUserExistenceByEmailRepository.Email): Promise<ConfirmUserExistenceByEmailRepository.Exists>
}

export namespace ConfirmUserExistenceByEmailRepository {
    export type Email = string
    export type Exists = boolean
}
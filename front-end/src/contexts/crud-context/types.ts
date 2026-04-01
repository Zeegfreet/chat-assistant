

export interface ICrudContextStates {
    isModalOpen: boolean
}

export enum ICrudContextTypes {
    SET_MODAL_OPEN = "CONTEXT/CRUD/SET_MODAL_OPEN",
    SET_MODAL_CLOSED = "CONTEXT/CRUD/SET_MODAL_CLOSED",
}


export interface setCrudContextModalOpen {
    type: ICrudContextTypes.SET_MODAL_OPEN
}

export interface setCrudModalClosed {
    type: ICrudContextTypes.SET_MODAL_CLOSED
}


export type ICrudContextActions = |
    setCrudContextModalOpen |
    setCrudModalClosed
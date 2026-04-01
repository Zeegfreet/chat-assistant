

export interface ICrudContextStates {
    isCreatePanelOpen: boolean,
    isReadPanelOpen: boolean,
    isUpdatePanelOpen: boolean,
    isDeleteModalOpen: boolean,
    isSearchPanelOpen: boolean,
    isAdvancedSearchOpen: boolean,
}

export type ICrudContextKeyState = keyof ICrudContextStates

export enum ICrudContextTypes {
    SET_PANEL_OPEN = "CRUD/CONTEXT/SET_PANEL_OPEN",
    SET_PANEL_CLOSED = "CRUD/CONTEXT/SET_PANEL_CLOSED"
}


export interface setPanelOpen {
    type: ICrudContextTypes.SET_PANEL_OPEN,
    keyState: ICrudContextKeyState
}

export interface setPanelClosed {
    type: ICrudContextTypes.SET_PANEL_CLOSED,
    keyState: ICrudContextKeyState
}

export type ICrudContextActions = |
    setPanelOpen |
    setPanelClosed
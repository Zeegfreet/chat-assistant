import type { Reducer } from "react";
import { ICrudContextTypes, type ICrudContextActions, type ICrudContextStates } from "./types";


export const crudContextInitialState: ICrudContextStates = {
    isCreatePanelOpen: false,
    isReadPanelOpen: false,
    isUpdatePanelOpen: false,
    isDeleteModalOpen: false,
    isSearchPanelOpen: false,
    isAdvancedSearchOpen: false,
}


export const crudContextReducer: Reducer<ICrudContextStates, ICrudContextActions> = (state, action) => {
    switch (action.type) {
        case ICrudContextTypes.SET_PANEL_OPEN:
            return { ...crudContextInitialState, [action.keyState]: true }
        case ICrudContextTypes.SET_PANEL_CLOSED:
            return { ...crudContextInitialState, [action.keyState]: false }
        default:
            return { ...state }
    }
}
import type { Reducer } from "react";
import { ICrudContextTypes, type ICrudContextActions, type ICrudContextStates } from "./types";


export const crudContextInitialState: ICrudContextStates = {
    isModalOpen: false
}


export const crudContextReducer: Reducer<ICrudContextStates, ICrudContextActions> = (state, action) => {
    switch (action.type) {
        case ICrudContextTypes.SET_MODAL_OPEN:
            return { ...state, isModalOpen: true }
        case ICrudContextTypes.SET_MODAL_CLOSED:
            return { ...state, isModalOpen: false }
        default:
            return { ...state }
    }
}
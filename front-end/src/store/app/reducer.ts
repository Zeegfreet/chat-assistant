import type { Reducer } from "@reduxjs/toolkit";
import { IAppTypes, type IAppActions, type IAppStates } from "./types";

export const initialState: IAppStates = {
    theme: "light"
}

export const appReducer: Reducer<IAppStates, IAppActions> = (state = initialState, action ) => {
    switch (action.type) {
        case IAppTypes.SET_THEME:
            return { ...state,theme: action.payload }
        case IAppTypes.TOGGLE_THEME:
            return { ...state, theme: state.theme === "dark" ? "light" : "dark" }
        default:
            return { ...state }
    }
}
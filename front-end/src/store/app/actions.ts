import type { Dispatch } from "@reduxjs/toolkit";
import { IAppTypes, type IAppActions } from "./types";


export const appActions = {
    toggleTheme: () => 
        (dispatch: Dispatch<IAppActions>) => {
            dispatch({
                type: IAppTypes.TOGGLE_THEME
            })
        }
}
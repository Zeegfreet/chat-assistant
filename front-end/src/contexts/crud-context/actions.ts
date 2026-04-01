import type { Dispatch } from "react"
import { ICrudContextTypes, type ICrudContextActions, type ICrudContextKeyState } from "./types"


export const crudContextActions = (dispatch: Dispatch<ICrudContextActions>) => ({
    panel: {
        open: (keyState: ICrudContextKeyState) => {
            dispatch({
                type: ICrudContextTypes.SET_PANEL_OPEN,
                keyState
            })
        },
        close: (keyState: ICrudContextKeyState) => {
            dispatch({
                type: ICrudContextTypes.SET_PANEL_CLOSED,
                keyState
            })
        }
    }
})
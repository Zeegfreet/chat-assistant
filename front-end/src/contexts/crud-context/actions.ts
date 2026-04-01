import type { Dispatch } from "react"
import { ICrudContextTypes, type ICrudContextActions } from "./types"


export const crudContextActions = (dispatch: Dispatch<ICrudContextActions>) => ({
    modal: {
        open: () => {
            dispatch({
                type: ICrudContextTypes.SET_MODAL_OPEN
            })
        },
        close: () => {
            dispatch({
                type: ICrudContextTypes.SET_MODAL_CLOSED
            })
        }
    }
})
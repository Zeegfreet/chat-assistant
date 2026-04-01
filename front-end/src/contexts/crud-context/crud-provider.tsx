import { createContext, useContext, useReducer, type ActionDispatch, type PropsWithChildren } from "react";
import { crudContextInitialState, crudContextReducer } from "./reducer";
import type { ICrudContextActions, ICrudContextStates } from "./types";
import { crudContextActions } from "./actions";

export type ICrudContext = [state: ICrudContextStates, ActionDispatch<[action: ICrudContextActions]>]

export const CrudContext = createContext({} as ICrudContext)


export const CrudContextProvider: React.FC<PropsWithChildren> = ({
    children
}) => {
    const [state, dispatch] = useReducer(crudContextReducer, crudContextInitialState)

    return (
        <CrudContext.Provider
            value={[state, dispatch]}
        >
            {children}
        </CrudContext.Provider>
    )
}

export const useCrudContext = () => {
    const context = useContext(CrudContext)
    const [state, dispatch] = context
    const actions = crudContextActions(dispatch)
    return { state, actions }
}
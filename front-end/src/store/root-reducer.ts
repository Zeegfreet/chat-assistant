import { combineReducers } from "@reduxjs/toolkit";
import { sessionReducer } from "./session/reducer";
import { appReducer } from "./app/reducer";
import { crudReducer } from "./crud/reducer";


const rootReducer = combineReducers({
    crud: crudReducer,
    session: sessionReducer,
    app: appReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
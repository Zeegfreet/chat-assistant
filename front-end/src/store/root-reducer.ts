import { combineReducers } from "@reduxjs/toolkit";
import { sessionReducer } from "./session/reducer";
import { appReducer } from "./app/reducer";


const rootReducer = combineReducers({
    session: sessionReducer,
    app: appReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
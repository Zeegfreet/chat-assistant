import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
import { getItem } from "@/utils/storage";

const sessionState = getItem('@session');

export default configureStore({
    reducer: rootReducer,
    preloadedState: {
        session: sessionState
    }
})
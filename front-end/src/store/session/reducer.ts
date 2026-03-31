import type { Reducer } from "@reduxjs/toolkit";
import { ISessionTypes, type ISessionActions, type ISessionStates } from "./types";
import { removeItem, setItem } from "@/utils/storage";


export const sessionInitialState: ISessionStates = {
    isLoading: false,
    isLogged: false,
    isSuccess: null,
    error: null,
    user: null,
    accessToken: null,
    refreshToken: null
}


export const sessionReducer: Reducer<ISessionStates, ISessionActions> =  (state = sessionInitialState, action) => {
    switch (action.type) {
        case ISessionTypes.SET_LOADING:
            return { ...state, isLoading: true, isSuccess: null, error: null }
        case ISessionTypes.SET_FINISH_LOADING:
            return { ...state, isLoading: false }
        case ISessionTypes.RESET_ACTION_STATES:
            return { ...state, isSuccess: null, isLoading: false, error: null }
        case ISessionTypes.SET_SUCCESS_SIGNUP:
            return { ...state, isLoading: false, isSuccess: true }
        case ISessionTypes.SET_FAIL_SIGNUP:
            return { ...state, isLoading: false, isSuccess: false, error: action.payload.error }
        case ISessionTypes.SET_SUCCESS_SIGNIN:
            const signedState = { 
                ...state,
                isLoading: false,
                isLogged: true,
                isSuccess: true,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }
            setItem('@session', JSON.stringify(signedState));
            return signedState;
        case ISessionTypes.SET_FAIL_SIGNIN:
            return { ...state, isLoading: false, isLogged: false, isSuccess: false, error: action.payload }
        case ISessionTypes.SET_SUCCESS_SIGNOUT:
            removeItem('@session');
            return { ...sessionInitialState }
        case ISessionTypes.SET_FAIL_SIGNOUT:
            removeItem('@session');
            return { ...sessionInitialState }
        case ISessionTypes.SET_SUCCESS_UPDATE_PROFILE:
            const updatedProfileState: ISessionStates = {
                ...state,
                isLoading: false,
                isSuccess: true,
                user: !state.user ? null : {
                    ...state.user,
                    ...action.payload
                }
            }
            setItem('@session', JSON.stringify(updatedProfileState));
            return {...updatedProfileState }
        case ISessionTypes.SET_FAIL_UPDATE_PROFILE:
            return { ...state, isLoading: false, isSuccess: false, error: action.payload }
        case ISessionTypes.SET_SUCCESS_UPDATE_PASSWORD:
            return { ...state, isLoading: false, isSuccess: true }
        case ISessionTypes.SET_FAIL_UPDATE_PASSWORD:
            return { ...state, isLoading: false, isSuccess: false, error: action.payload }
        case ISessionTypes.SET_SUCCESS_REFRESH:
            const refreshState = { 
                ...state,
                isLoading: false,
                isLogged: true,
                isSuccess: true,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken
            }
            setItem('@session', JSON.stringify(refreshState));
            return refreshState;
        case ISessionTypes.SET_FAIL_REFRESH:
            return {...state, isSuccess: false, isLoading: false, error: action.payload }
        default:
            return { ...state };
    }
}
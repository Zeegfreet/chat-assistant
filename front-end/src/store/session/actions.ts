import type { Dispatch } from "@reduxjs/toolkit";
import { ISessionTypes, type IProfileChangePassword, type IProfileData, type ISessionActions } from "./types";
import { authServices } from "@/services/authServices";



export const sessionActions = {
    restoreStates: () => 
        (dispatch: Dispatch<ISessionActions>) => {
            dispatch({
                type: ISessionTypes.RESET_ACTION_STATES
            })
        },
    signOut: () => 
    async (dispatch: Dispatch<ISessionActions>) => {
        dispatch({
            type: ISessionTypes.SET_LOADING
        })

        const response = await authServices.signOut();
        
        if(response.success){
            dispatch({
                type: ISessionTypes.SET_SUCCESS_SIGNOUT
            })
        } else {
            dispatch({
                type: ISessionTypes.SET_FAIL_SIGNOUT,
                payload: {
                    error: response.error || "An error occurred during sign out"
                }
            })
        }

    },
    signIn: (payload: unknown) => 
        async (dispatch: Dispatch<ISessionActions>) => {
            dispatch({
                type: ISessionTypes.SET_LOADING
            })
            const response = await authServices.signIn(payload)
            
            if(response.success){
                dispatch({
                    type: ISessionTypes.SET_SUCCESS_SIGNIN,
                    payload: {
                        user: response.data.user,
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken
                    }
                })
            } else {
                dispatch({
                    type: ISessionTypes.SET_FAIL_SIGNIN,
                    payload: response.error || "An error occurred during sign in"
                })
            }
    },
    signUp: (payload: unknown) => 
        async (dispatch: Dispatch<ISessionActions>) => {
            dispatch({
                type: ISessionTypes.SET_LOADING
            })
            const response = await authServices.signup(payload)

            if(response.success){
                dispatch({
                    type: ISessionTypes.SET_SUCCESS_SIGNUP
                })
            } else {
                dispatch({
                    type: ISessionTypes.SET_FAIL_SIGNUP,
                    payload: {
                        error: response.error || "An error occurred during sign up"
                    }
                })
            }
        },
    refresh: () => 
        async (dispatch: Dispatch<ISessionActions>) => {
            dispatch({
                type: ISessionTypes.SET_LOADING
            })

            const response = await authServices.refresh()

            if(response.success){
                dispatch({
                    type: ISessionTypes.SET_SUCCESS_REFRESH,
                    payload: {
                        user: response.data.user,
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken
                    }
                })
                return {
                        user: response.data.user,
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken
                    }
            } else {
                dispatch({
                    type: ISessionTypes.SET_FAIL_REFRESH,
                    payload: response.error || "Session fully expired or revoked"
                })
            }
            
        },
    updateProfile: (payload: IProfileData) => 
        async (dispatch: Dispatch<ISessionActions>) => {
            dispatch({
                type: ISessionTypes.SET_LOADING
            })

            const response = await authServices.updateProfile(payload)

            if(response.success === true) {
                dispatch({
                    type: ISessionTypes.SET_SUCCESS_UPDATE_PROFILE,
                    payload: response.result!
                })
            } else {
                dispatch({
                    type: ISessionTypes.SET_FAIL_UPDATE_PROFILE,
                    payload: response.error as string
                })
            }
        },
    changePassword: (payload: IProfileChangePassword) =>
        async (dispatch: Dispatch<ISessionActions>) => {
            dispatch({
                type: ISessionTypes.SET_LOADING
            })

            const response = await authServices.changePassword(payload);

            if(response.success){
                dispatch({
                    type: ISessionTypes.SET_SUCCESS_UPDATE_PASSWORD
                })
            } else {
                dispatch({
                    type: ISessionTypes.SET_FAIL_UPDATE_PASSWORD,
                    payload: response.error
                })
            }
        }
}
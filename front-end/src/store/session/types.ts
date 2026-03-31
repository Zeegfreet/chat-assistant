
export interface ISessionStates {
    isLoading: boolean
    isLogged: boolean
    isSuccess: boolean | null
    error: string | null
    user: {
        id: number
        name: string
        email: string
        roles: string[]
        permissions: string[]
    } | null
    accessToken: string | null
    refreshToken: string | null
}

export type IProfileData =  {
    name: string
}

export type IProfileChangePassword = {
    password: string,
    newPassword: string,
    passwordConfirm: string,
}


export enum ISessionTypes {
    SET_LOADING = "SESSION/SET_LOADING",
    SET_FINISH_LOADING = "SESSION/SET_FINISH_LOADING",
    RESET_ACTION_STATES = "SESSION/RESET_ACTION_STATES",
    SET_SUCCESS_SIGNUP = "SESSION/SET_SUCCESS_SIGNUP",
    SET_FAIL_SIGNUP = "SESSION/SET_FAIL_SIGNUP",
    SET_SUCCESS_SIGNIN = "SESSION/SET_SUCCESS_SIGNIN",
    SET_FAIL_SIGNIN = "SESSION/SET_FAIL_SIGNIN",
    SET_SUCCESS_SIGNOUT = "SESSION/SET_SUCCESS_SIGNOUT",
    SET_FAIL_SIGNOUT = "SESSION/SET_FAIL_SIGNOUT",
    SET_SUCCESS_UPDATE_PROFILE = "SESSION/SET_SUCCESS_UPDATE_PROFILE",
    SET_FAIL_UPDATE_PROFILE = "SESSION/SET_FAIL_UPDATE_PROFILE",
    SET_SUCCESS_UPDATE_PASSWORD = "SESSION/SET_SUCCESS_UPDATE_PASSWORD",
    SET_FAIL_UPDATE_PASSWORD = "SESSION/SET_FAIL_UPDATE_PASSWORD",
    SET_SUCCESS_REFRESH = "SESSION/SET_SUCCESS_REFRESH",
    SET_FAIL_REFRESH = "SESSION/SET_FAIL_REFRESH",
}

interface ISessionSignUpFailedPayload {
    error: string
}

interface setSuccessUpdateProfile {
    type: ISessionTypes.SET_SUCCESS_UPDATE_PROFILE,
    payload: {
        name: string
    }
}

interface setFailUpdateProfile {
    type: ISessionTypes.SET_FAIL_UPDATE_PROFILE,
    payload: string
}

interface setSuccessUpdatePassword {
    type: ISessionTypes.SET_SUCCESS_UPDATE_PASSWORD
}

interface setFailUpdatePassword {
    type: ISessionTypes.SET_FAIL_UPDATE_PASSWORD,
    payload: string
}

interface resetActionStates {
    type: ISessionTypes.RESET_ACTION_STATES
}

interface setLoading {
    type: ISessionTypes.SET_LOADING
}

interface setFinishLoading {
    type: ISessionTypes.SET_FINISH_LOADING
}

interface setSuccessSignup {
    type: ISessionTypes.SET_SUCCESS_SIGNUP
}

interface setFailSignup {
    type: ISessionTypes.SET_FAIL_SIGNUP
    payload: ISessionSignUpFailedPayload
}

interface setSuccessSignIn {
    type: ISessionTypes.SET_SUCCESS_SIGNIN,
    payload: {
        user: ISessionStates["user"]
        accessToken: string
        refreshToken: string
    }
}

interface setFailSignin {
    type: ISessionTypes.SET_FAIL_SIGNIN,
    payload: string
}

interface setSuccessSignout {
    type: ISessionTypes.SET_SUCCESS_SIGNOUT
}

interface setFailSignout {
    type: ISessionTypes.SET_FAIL_SIGNOUT,
    payload: {
        error: string
    }
}

interface setSuccessRefresh {
    type: ISessionTypes.SET_SUCCESS_REFRESH,
    payload: {
        user: ISessionStates["user"]
        accessToken: string
        refreshToken: string
    }
}

interface setFailRefresh {
    type: ISessionTypes.SET_FAIL_REFRESH,
    payload: string
}

export type ISessionActions = 
| setLoading
| setFinishLoading
| setSuccessSignup
| setFailSignup
| setSuccessSignIn
| setFailSignin
| setSuccessSignout
| setFailSignout
| setSuccessRefresh
| setSuccessUpdateProfile
| setFailUpdateProfile
| resetActionStates
| setFailRefresh
| setSuccessUpdatePassword
| setFailUpdatePassword


export interface IAppStates {
    theme: "dark" | "light"
}


export enum IAppTypes {
    SET_THEME = "APP/SET_THEME",
    TOGGLE_THEME = "APP/TOGGLE_THEME"
}

export interface setTheme {
    type: IAppTypes.SET_THEME,
    payload: IAppStates['theme']
}

export interface toggleTheme {
    type: IAppTypes.TOGGLE_THEME
}

export type IAppActions = setTheme | toggleTheme
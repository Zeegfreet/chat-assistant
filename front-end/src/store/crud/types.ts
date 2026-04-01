

interface AnyRecord {
    id: string | number,
    [key: string | number]: any
}

export interface ICrudModuleStates<T = AnyRecord> {
    currentItem: T | null,
    resultItem: T | null,
    isLoading: boolean,
    isSuccess: boolean | null,
    error: string | null
}

export interface ISearchModuleStates<T = AnyRecord> {
    items: T[],
    isLoading: boolean,
    isSuccess: boolean | null,
    error: string | null,
    pagination: {
        currentPage: number,
        totalPages: number,
        limit: number
    }
}

export interface ICrudStates<T = AnyRecord> {
    create: ICrudModuleStates<T>,
    read: ICrudModuleStates<T>,
    update: ICrudModuleStates<T>,
    delete: ICrudModuleStates<T>,
    search: ISearchModuleStates<T>
}


export type CrudKeyStates = keyof ICrudStates

export enum ICrudTypes {
    SET_LOADING = "CRUD/SET_LOADING",
    SET_FINISH_LOADING = "CRUD/SET_FINISH_LOADING",
    RESET_ALL_ACTION_STATES = "CRUD/RESET_ALL_ACTION_STATES",
    RESET_ONE_ACTION_STATE = "CRUD/RESET_ONE_ACTION_STATE",
    SET_SUCCESS_FETCH_ALL = "CRUD/SET_SUCCESS_FETCH_ALL",
    SET_FAIL_FETCH_ALL = "CRUD/SET_FAIL_FETCH_ALL",
    SET_SUCCESS_SEARCH = "CRUD/SET_SUCCESS_SEARCH",
    SET_FAIL_SEARCH = "CRUD/SET_FAIL_SEARCH",
    SET_SUCCESS_FETCH_ONE = "CRUD/SET_SUCCESS_FETCH_ONE",
    SET_FAIL_FETCH_ONE = "CRUD/SET_FAIL_FETCH_ONE",
    SET_SUCCESS_CREATE = "CRUD/SET_SUCCESS_CREATE",
    SET_FAIL_CREATE = "CRUD/SET_FAIL_CREATE",
    SET_SUCCESS_UPDATE = "CRUD/SET_SUCCESS_UPDATE",
    SET_FAIL_UPDATE = "CRUD/SET_FAIL_UPDATE",
    SET_SUCCESS_DELETE = "CRUD/SET_SUCCESS_DELETE",
    SET_FAIL_DELETE = "CRUD/SET_FAIL_DELETE",
}


export interface setLoading {
    type: ICrudTypes.SET_LOADING,
    keyState: CrudKeyStates
}

export interface setFinishLoading {
    type: ICrudTypes.SET_FINISH_LOADING,
    keyState: CrudKeyStates
}

export interface setSuccessSearch<T> {
    type: ICrudTypes.SET_SUCCESS_SEARCH,
    payload: {
        items: T[],
        currentPage: number,
        totalPages: number,
        limit: number
    }
}

export interface setFailSearch {
    type: ICrudTypes.SET_FAIL_SEARCH,
    payload: string
}

export interface setSuccessFetchOne<T> {
    type: ICrudTypes.SET_SUCCESS_FETCH_ONE,
    keyState: CrudKeyStates,
    payload: T
}

export interface setFailFetchOne {
    type: ICrudTypes.SET_FAIL_FETCH_ONE,
    keyState: CrudKeyStates,
    payload: string
}

export interface setSuccessCreate<T> {
    type: ICrudTypes.SET_SUCCESS_CREATE,
    payload: T
}

export interface setFailCreate {
    type: ICrudTypes.SET_FAIL_CREATE,
    payload: string
}

export interface setSuccessUpdate<T> {
    type: ICrudTypes.SET_SUCCESS_UPDATE,
    keyState: CrudKeyStates,
    payload: T
}

export interface setFailUpdate {
    type: ICrudTypes.SET_FAIL_UPDATE,
    keyState: CrudKeyStates,
    payload: string
}

export interface setSuccessDelete {
    type: ICrudTypes.SET_SUCCESS_DELETE,
    payload: string | number
}

export interface setFailDelete {
    type: ICrudTypes.SET_FAIL_DELETE,
    payload: string
}

export interface resetAllActionStates {
    type: ICrudTypes.RESET_ALL_ACTION_STATES
}

export interface resetOneActionState {
    type: ICrudTypes.RESET_ONE_ACTION_STATE
    keyState: CrudKeyStates
}



export type ICrudActions<T> =
    setSuccessFetchOne<T> |
    setFailFetchOne |
    setSuccessCreate<T> |
    setFailCreate |
    setSuccessUpdate<T> |
    setFailUpdate |
    setSuccessDelete |
    setFailDelete |
    resetAllActionStates |
    resetOneActionState |
    setLoading |
    setFinishLoading |
    setSuccessSearch<T> |
    setFailSearch
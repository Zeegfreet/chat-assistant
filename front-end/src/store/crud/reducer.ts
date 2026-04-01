import type { Reducer } from "@reduxjs/toolkit";
import { ICrudTypes, type ICrudActions, type ICrudModuleStates, type ICrudStates, type ISearchModuleStates } from "./types";


export const initialCrudState: ICrudModuleStates = {
    currentItem: null,
    resultItem: null,
    isLoading: false,
    isSuccess: null,
    error: null
}

export const initialSearchState: ISearchModuleStates = {
    items: [],
    isLoading: false,
    isSuccess: null,
    error: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        limit: 10,
    },
}

export const initialState: ICrudStates<any> = {
    create: initialCrudState,
    read: initialCrudState,
    update: initialCrudState,
    delete: initialCrudState,
    search: initialSearchState
}

export const crudReducer: Reducer<ICrudStates<any>, ICrudActions<any>> = (state = initialState, action) => {
    switch (action.type) {
        case ICrudTypes.SET_LOADING:
            return {
                ...state,
                [action.keyState]: {
                    ...state[action.keyState],
                    isLoading: true,
                    isSuccess: null,
                    error: null
                }
            }
        case ICrudTypes.SET_FINISH_LOADING:
            return {
                ...state,
                [action.keyState]: {
                    ...state[action.keyState],
                    isLoading: false,
                }
            }

        case ICrudTypes.SET_SUCCESS_SEARCH:
            return {
                ...state,
                search: {
                    ...state.search,
                    isLoading: false,
                    isSuccess: true,
                    items: action.payload.items,
                    pagination: {
                        ...state.search.pagination,
                        currentPage: action.payload.currentPage,
                        totalPages: action.payload.totalPages,
                        limit: action.payload.limit
                    }
                }
            }
        case ICrudTypes.SET_FAIL_SEARCH:
            return {
                ...state,
                search: {
                    ...state.search,
                    isLoading: false,
                    isSuccess: false,
                    error: action.payload
                }
            }
        case ICrudTypes.RESET_ACTION_STATES:
            return {
                ...initialState
            }

        default:
            return state;
    }

}
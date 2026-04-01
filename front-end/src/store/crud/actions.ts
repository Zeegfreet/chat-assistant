import type { Dispatch } from "@reduxjs/toolkit";
import { ICrudTypes, type CrudKeyStates, type ICrudActions } from "./types";
import { httpServices, type IPathName, type ISearchQuery } from "@/services/httpServices";


export const crudActions = ({
    setCurrent: <T = any>(id: string | number, pathName: IPathName, keyState: CrudKeyStates) =>
        async (dispatch: Dispatch<ICrudActions<T>>) => {
            dispatch({
                type: ICrudTypes.SET_LOADING,
                keyState
            })

            const response = await httpServices.findById(pathName, id)

            if (response.success && response.data) {
                return dispatch({
                    type: ICrudTypes.SET_SUCCESS_FETCH_ONE,
                    keyState,
                    payload: response.data
                })
            }

            return dispatch({
                type: ICrudTypes.SET_FAIL_FETCH_ONE,
                keyState,
                payload: response.error || "An error occurred while creating."
            })
        },
    delete: <T = any>(id: string | number, pathName: IPathName) =>
        async (dispatch: Dispatch<ICrudActions<T>>) => {
            dispatch({
                type: ICrudTypes.SET_LOADING,
                keyState: "delete"
            })

            const response = await httpServices.delete(pathName, id)

            if (response.success) {
                return dispatch({
                    type: ICrudTypes.SET_SUCCESS_DELETE,
                    payload: id
                })
            }

            return dispatch({
                type: ICrudTypes.SET_FAIL_DELETE,
                payload: response.error || "An error occurred while creating."
            })
        },
    create: <T>(payload: T, pathName: IPathName) =>
        async (dispatch: Dispatch<ICrudActions<T>>) => {
            dispatch({
                type: ICrudTypes.SET_LOADING,
                keyState: "create"
            })

            const response = await httpServices.create(pathName, payload)


            if (response.success && response.data) {
                return dispatch({
                    type: ICrudTypes.SET_SUCCESS_CREATE,
                    payload: response.data
                })
            }

            return dispatch({
                type: ICrudTypes.SET_FAIL_CREATE,
                payload: response.error || "An error occurred while creating."
            })
        },
    search: <T>(query: ISearchQuery, pathName: IPathName) =>
        async (dispatch: Dispatch<ICrudActions<T>>) => {
            dispatch({
                type: ICrudTypes.SET_LOADING,
                keyState: "search"
            })

            if (!query.limit) query.limit = 10

            const response = await httpServices.search(pathName, query)

            if (response.success && response.data) {
                return dispatch({
                    type: ICrudTypes.SET_SUCCESS_SEARCH,
                    payload: {
                        items: response.data.data,
                        totalPages: response.data.totalPages,
                        currentPage: response.data.currentPage,
                        limit: query.limit
                    }
                })
            }

            return dispatch({
                type: ICrudTypes.SET_FAIL_SEARCH,
                payload: response.error || "An error occurred while searching."
            })
        },
    resetOneModule: (keyState: CrudKeyStates) =>
        (dispatch: Dispatch<ICrudActions<any>>) => {
            dispatch({
                type: ICrudTypes.RESET_ONE_ACTION_STATE,
                keyState
            })
        },
    reset: <T>() =>
        (dispatch: Dispatch<ICrudActions<T>>) => {
            dispatch({
                type: ICrudTypes.RESET_ALL_ACTION_STATES
            })
        }
})
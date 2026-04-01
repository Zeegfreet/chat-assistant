import type { Dispatch } from "@reduxjs/toolkit";
import { ICrudTypes, type ICrudActions } from "./types";
import { httpServices, type PathName } from "@/services/httpServices";


export const crudActions = ({
    search: <T>(query: T, pathName: PathName) => 
        async (dispatch: Dispatch<ICrudActions<T>>) => {
            dispatch({
                type: ICrudTypes.SET_LOADING
            })

            const response = await httpServices.search(pathName, query)
            
            if(response.success && response.data){
                return dispatch({
                    type: ICrudTypes.SET_SUCCESS_SEARCH,
                    payload: {
                        items: response.data.data,
                        totalPages: response.data.totalPages,
                        currentPage: response.data.currentPage,
                    }
                })
            }

            return dispatch({
                type: ICrudTypes.SET_FAIL_SEARCH,
                payload: response.error || "An error occurred while searching."
            })
        },
    create: <T>(payload: T, pathName: PathName) => 
        async (dispatch: Dispatch<ICrudActions<T>>) => {
            dispatch({
                type: ICrudTypes.SET_LOADING
            })
            
        }
})
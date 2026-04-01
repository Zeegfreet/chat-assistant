import type { Reducer } from "@reduxjs/toolkit";
import {  ICrudTypes, type ICrudActions, type ICrudStates } from "./types";


export const initialState: ICrudStates<any> = {
    items: [],
    isLoading: false,
    isSuccess: null,
    error: null,
    selectedItem: null
}

export const crudReducer: Reducer<ICrudStates<any>, ICrudActions<any>> = (state = initialState, action) => {
    switch (action.type) {
        case ICrudTypes.SET_LOADING :
            return { ...state, isLoading: true, isSuccess: null, error: null }
        case ICrudTypes.SET_FINISH_LOADING :
            return { ...state, isLoading: false }
        case ICrudTypes.RESET_ACTION_STATES :
            return { ...state, isSuccess: null, isLoading: false, error: null }
        case ICrudTypes.SET_SUCCESS_SEARCH :
            return { ...state, isLoading: false, items: action.payload.items, currentPage: action.payload.currentPage, totalPages: action.payload.totalPages, isSuccess: true }
        case ICrudTypes.SET_FAIL_SEARCH :
            return { ...state, isLoading: false, error: action.payload, isSuccess: false } 
        case ICrudTypes.SET_SUCCESS_FETCH_ALL :
            return { ...state, isLoading: false, items: action.payload, isSuccess: true }
        case ICrudTypes.SET_FAIL_FETCH_ALL :
            return { ...state, isLoading: false, error: action.payload, isSuccess: false }
        case ICrudTypes.SET_SUCCESS_FETCH_ONE :
            return { ...state, isLoading: false, selectedItem: action.payload, isSuccess: true }
        case ICrudTypes.SET_FAIL_FETCH_ONE :
            return { ...state, isLoading: false, error: action.payload, isSuccess: false }
        case ICrudTypes.SET_SUCCESS_CREATE :
            return { ...state, isLoading: false, items: [...state.items, action.payload], isSuccess: true }
        case ICrudTypes.SET_FAIL_CREATE :
            return { ...state, isLoading: false, error: action.payload, isSuccess: false }
        case ICrudTypes.SET_SUCCESS_UPDATE :
            const updatedItems = state.items.map(item => item.id === action.payload.id ? action.payload : item);
            const isSelectedItemUpdated = state.selectedItem && state.selectedItem.id === action.payload.id;
            return { 
                ...state, 
                isLoading: false, 
                items: updatedItems, 
                selectedItem: isSelectedItemUpdated ? action.payload : state.selectedItem,
                isSuccess: true 
            }
        case ICrudTypes.SET_FAIL_UPDATE :
            return { ...state, isLoading: false, error: action.payload, isSuccess: false }
        case ICrudTypes.SET_SUCCESS_DELETE :
            const filteredItems = state.items.filter(item => item.id !== action.payload);
            const isSelectedItemDeleted = state.selectedItem && state.selectedItem.id === action.payload;
            return { 
                ...state, 
                isLoading: false, 
                items: filteredItems, 
                selectedItem: isSelectedItemDeleted ? null : state.selectedItem,
                isSuccess: true 
            }
        case ICrudTypes.SET_FAIL_DELETE :
            return { ...state, isLoading: false, error: action.payload, isSuccess: false }
    
        default:
            return state;
    }

}
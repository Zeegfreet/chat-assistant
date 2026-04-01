import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../root-reducer";

const selectCrud = (state: RootState) => state.crud
const selectSearch = (state: RootState) => state.crud.search

export const selectByCrudSearchItems = createSelector([selectSearch], (state) => state.items)
export const selectByCrudSearchIsLoading = createSelector([selectSearch], (state) => state.isLoading)
export const selectByCrudSearchIsSuccess = createSelector([selectSearch], (state) => state.isSuccess)
export const selectByCrudSearchError = createSelector([selectSearch], (state) => state.error)
export const selectByCrudSearchPagination = createSelector([selectSearch], (state) => state.pagination)

import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../root-reducer";

const selectSearch = (state: RootState) => state.crud.search
const selectCreate = (state: RootState) => state.crud.create
const selectUpdate = (state: RootState) => state.crud.update
const selectDelete = (state: RootState) => state.crud.delete

export const selectByCrudSearchItems = createSelector([selectSearch], (state) => state.items)
export const selectByCrudSearchIsLoading = createSelector([selectSearch], (state) => state.isLoading)
export const selectByCrudSearchIsSuccess = createSelector([selectSearch], (state) => state.isSuccess)
export const selectByCrudSearchError = createSelector([selectSearch], (state) => state.error)
export const selectByCrudSearchPagination = createSelector([selectSearch], (state) => state.pagination)


export const selectByCrudCreateCurrentItem = createSelector([selectCreate], (state) => state.currentItem)
export const selectByCrudCreateResultItem = createSelector([selectCreate], (state) => state.resultItem)
export const selectByCrudCreateIsLoading = createSelector([selectCreate], (state) => state.isLoading)
export const selectByCrudCreateIsSuccess = createSelector([selectCreate], (state) => state.isSuccess)
export const selectByCrudCreateError = createSelector([selectCreate], (state) => state.error)

export const selectByCrudUpdateCurrentItem = createSelector([selectUpdate], (state) => state.currentItem)
export const selectByCrudUpdateResultItem = createSelector([selectUpdate], (state) => state.resultItem)
export const selectByCrudUpdateIsLoading = createSelector([selectUpdate], (state) => state.isLoading)
export const selectByCrudUpdateIsSuccess = createSelector([selectUpdate], (state) => state.isSuccess)
export const selectByCrudUpdateError = createSelector([selectUpdate], (state) => state.error)

export const selectByCrudDeleteCurrentItem = createSelector([selectDelete], (state) => state.currentItem)
export const selectByCrudDeleteResultItem = createSelector([selectDelete], (state) => state.resultItem)
export const selectByCrudDeleteIsLoading = createSelector([selectDelete], (state) => state.isLoading)
export const selectByCrudDeleteIsSuccess = createSelector([selectDelete], (state) => state.isSuccess)
export const selectByCrudDeleteError = createSelector([selectDelete], (state) => state.error)


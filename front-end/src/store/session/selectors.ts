import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../root-reducer";

const selectSession = (state: RootState) => state.session
const selectLoggedUser = (state: RootState) => state.session.user

export const selectBySessionLoggedState = createSelector([selectSession], (state) => state.isLogged)
export const selectBySessionIsLoadingState = createSelector([selectSession], (state) => state.isLoading)
export const selectBySessionIsSuccessState = createSelector([selectSession], (state) => state.isSuccess)
export const selectBySessionErrorState = createSelector([selectSession], (state) => state.error)
export const selectBySessionAccessToken = createSelector([selectSession], (state) => state.accessToken)
export const selectBySessionRefreshToken = createSelector([selectSession], (state) => state.refreshToken)
export const selectBySessionLoggedUser = createSelector([selectSession], (state) => state.user)
export const selectByLoggedUserId = createSelector([selectLoggedUser], (state) => state?.id)
export const selectByLoggedUserName = createSelector([selectLoggedUser], (state) => state?.name)
export const selectByLoggedUserEmail = createSelector([selectLoggedUser], (state) => state?.email)
export const selectByLoggedUserRoles = createSelector([selectLoggedUser], (state) => state?.roles)
export const selectByLoggedUserPermissions = createSelector([selectLoggedUser], (state) => state?.permissions)
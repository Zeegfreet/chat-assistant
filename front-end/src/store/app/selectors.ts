import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../root-reducer";

export const selectApp = (state: RootState) => state.app

export const selectThemeByApp = createSelector([selectApp], (state) => state.theme)
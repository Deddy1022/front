import { createSelector } from "@ngrx/store";
import { AppState } from "../../../models/app-state";
import { pointageAdapter } from "./pointage.reducer";

export const pointagesSelector = (state: AppState) => state.pointages;

export const pointageLoadingSelector = createSelector(
  pointagesSelector,
  state => state.loading
)

export const pointageSelector = createSelector(
  pointagesSelector,
  pointageAdapter.getSelectors().selectAll
)
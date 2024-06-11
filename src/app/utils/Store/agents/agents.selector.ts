import { createSelector } from "@ngrx/store";
import { AppState } from "../../../models/app-state";
import { adapter } from "./agents.reducers";
import { AgentsState } from "../../../models/agents";

export const featureSelector = (state: AppState) => state.agents;

export const isLoadingSelector = createSelector(
  featureSelector,
  (state) => state.loading
)

export const agentListSelector = createSelector(
  featureSelector,
  adapter.getSelectors().selectAll
);
    
export const loadingCrudSelector = createSelector(
  featureSelector,
  (state) => state.selectMatricule
)

// export const selectEntities = createSelector(
//   featureSelector,
//   adapter.getSelectors().selectEntities,
// )

export const selectAgentByIM = createSelector(
  featureSelector,
  (state: AgentsState) => state.selectMatricule
)

export const getCurrentAgent = createSelector(
  featureSelector,
  selectAgentByIM,
  state => state.entities[state.selectMatricule!]
)
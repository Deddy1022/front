import { ActionReducer, MetaReducer, createReducer, on } from "@ngrx/store";
import { Agents, AgentsState } from "../../../models/agents";
import { AgentApiAction, AgentCrudAction, loadAction, loadAgentAction, loadAgentToUpdateAction, loadUpdateActionSuccess } from "./agents.action";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export const reducerKey = 'agents';

export function selectUserId(a: Agents): number {
  const { matricule } = a;
  return matricule;
}

export const adapter: EntityAdapter<Agents> = createEntityAdapter<Agents>({
  selectId: selectUserId,
  sortComparer: false
});

export const initialState: AgentsState = adapter.getInitialState({
  selectMatricule: null,
  loading: false,
  error: null
});
// export const actionReducer = (reducer: ActionReducer<any>): ActionReducer<any> => {
//   return (state, action) => {
//     console.log("state", state);
//     console.log("action", action);
//     return reducer(state, action);
//   }
// }

export const agentReducer = createReducer(
  initialState,
  // on(loadAgentAction, (state) => ({...state, loading: true})),

  on(AgentApiAction.retrieveAgentsList, (state, { agents }) => adapter.addMany(agents, {...state, loading: false})),

  on(AgentApiAction.failure, (state, { error }) => ({...state, error})),

  on(loadAgentToUpdateAction, (state, { matricule }) => ({ ...state, loading: true, selectMatricule: matricule })),

  on(loadUpdateActionSuccess, (state, { agent }) => {
    return adapter.addOne(agent, { ...state, loading: false })}
  ),

  on(loadAction.addAgent, (state, payload) => ({...state, loading: true})),

  on(AgentCrudAction.addAgentSuccess, (state, { agent }) => {
    if(!agent) return {...state, loading: false};
    return adapter.addOne(agent, { ...state, loading: false });
  }),
  
  // on(loadAction.updateAction, (state) => ({...state, loading: true})),

  on(AgentCrudAction.updateAgent, (state, { agent }) => adapter.updateOne({id: agent.matricule, changes: agent}, { ...state, loading: false })),
  
  on(loadAction.deleteAction, (state, { matricule }) => ({...state, loading: true, selectMatricule: matricule})),

  on(AgentCrudAction.deleteAgentSuccess, (state, { matricule }) => {
    if(state.entities[matricule]) return adapter.removeOne(matricule, {...state, loading: false});
    return state;
  }),
);

// export const metaReducer : MetaReducer[] = [actionReducer];
import { createAction, createActionGroup, props } from "@ngrx/store";
import { Agents } from "../../../models/agents";

export const loadAction = createActionGroup({
  source: 'Load',
  events: {
    addAgent: props<{ agent: Agents}>(),
    updateAction: props<{ agent: Agents }>(),
    deleteAction: props<{ matricule: number }>()
  }
})
export const loadAgentAction = createAction('[Load Agents] loading');
export const loadAgentToUpdateAction = createAction('[Load Agent] update', props<{ matricule: number }>());
export const loadUpdateActionSuccess = createAction('[Load Agent Success] Success', props<{ agent: Agents }>());

export const AgentApiAction = createActionGroup({
  source: 'Agents API',
  events: {
    retrieveAgentsList: props<{ agents: Agents[]}>(),
    failure: props<{ error: string }>()
  }
});

export const AgentCrudAction = createActionGroup({
  source: 'Agent Crud',
  events: {
    addAgentSuccess: props<{ agent: Agents }>(),
    updateAgent: props<{ agent: Agents }>(),
    deleteAgentSuccess: props<{ matricule: number }>()
  }
})

export const { retrieveAgentsList } = AgentApiAction;
import { Injectable, untracked } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ApiService } from "../../../services/api.service";
import { catchError, exhaustMap, map, mergeMap, switchMap } from "rxjs/operators"
import { of } from "rxjs";
import { Agents, OnSuccess } from "../../../models/agents";
import { AgentApiAction, AgentCrudAction, loadAction, loadAgentAction, loadAgentToUpdateAction, loadUpdateActionSuccess } from "./agents.action";

@Injectable()
export class AgentEffect {
  private URL = '';

  loadAgents$ = createEffect(() => this.action$.pipe(
    ofType(loadAgentAction),
    exhaustMap(() => this.apiService.get<Agents[]>(``)
      .pipe(
        map(agents => AgentApiAction.retrieveAgentsList({ agents })),
        catchError((error) => of(AgentApiAction.failure({ error: error.message })))
      ))
    )
  );

  loadAgentData$ = createEffect(() => this.action$.pipe(
    ofType(loadAgentToUpdateAction),
    switchMap(({ matricule }) => this.apiService.getByInfo<Agents>(``).pipe(
      map(agent => loadUpdateActionSuccess({ agent })),
      catchError(error => of(AgentApiAction.failure({ error: error.message })))
    ))
  ));

  addAgent$ = createEffect(() => this.action$.pipe(
    ofType(loadAction.addAgent),
    mergeMap(({ agent }) => this.apiService.post<Agents>(``, agent).pipe(
      map((agent) => AgentCrudAction.addAgentSuccess({ agent })),
      catchError(({ error }) => of(AgentApiAction.failure({ error: error.message })))
    ))
  ))

  updateAgent$ = createEffect(() => this.action$.pipe(
    ofType(loadAction.updateAction),
    // map((action) => action.agent),
    mergeMap(({agent}) => this.apiService.put<Agents>(``, agent)
      .pipe(
        map(agent => AgentCrudAction.updateAgent({ agent })),
      )
    )
  ));

  deleteAgent$ = createEffect(() => this.action$.pipe(
    ofType(loadAction.deleteAction),
    mergeMap(({ matricule }) => this.apiService.delete<OnSuccess>(``).pipe(
      map(() => AgentCrudAction.deleteAgentSuccess({ matricule })),
      catchError(({ error }) => of(AgentApiAction.failure({ error: error.error })))
    ))
  ))
  constructor(
    private action$: Actions,
    private apiService: ApiService
  ) {}
}
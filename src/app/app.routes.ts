import { Routes } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { agentReducer, reducerKey } from './utils/Store/agents/agents.reducers';
import { provideEffects } from '@ngrx/effects';
import { AgentEffect } from './utils/Store/agents/agents.effects';
import { PointageReducer, pointageReducerKey } from './utils/Store/pointage/pointage.reducer';
import { PointageEffect } from './utils/Store/pointage/pointage.effects';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashbord',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => 
      import('./components/dashboard/dashboard.component').then(
        c => c.DashboardComponent
      ),
    title: 'Dashboard',
    providers: [
      provideState({
        name: reducerKey,
        reducer: agentReducer
      }),
      provideEffects(AgentEffect)
    ],
    children: [
      {
        path: '',
        redirectTo: 'liste',
        pathMatch: 'full'
      },
      {
        path: 'liste',
        loadComponent: () => 
          import('./components/dashboard/agents/agents.component').then(
            child => child.AgentsComponent
          ),
        title: 'Liste des agents',
      },
      {
        path: 'update/:matricule',
        loadComponent: () =>
          import('./components/dashboard/agents/agent-update/agent-update.component').then(
            child => child.AgentUpdateComponent
          ),
      },
      {
        path: 'liste/ajouter',
        loadComponent: () =>
          import('./components/dashboard/agents/agent-add/agent-add.component').then(
            child => child.AgentAddComponent
          )
      },
      {
        path: 'pointage',
        loadComponent: () =>
          import('./components/dashboard/pointage/pointage.component').then( child => child.PointageComponent ),
        providers: [
          provideState({
            name: pointageReducerKey,
            reducer: PointageReducer
          }),
          provideEffects(PointageEffect)
        ]
      }
    ]
  },
];

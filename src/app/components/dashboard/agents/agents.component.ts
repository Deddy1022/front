import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Agents } from '../../../models/agents';
import { Store, select } from '@ngrx/store';
import { ApiService } from '../../../services/api.service';
import { AgentApiAction, loadAgentAction } from '../../../utils/Store/agents/agents.action';
import { AgentsListComponent } from './agents-list/agents-list.component';
import { AsyncPipe } from '@angular/common';
import { agentListSelector, isLoadingSelector } from '../../../utils/Store/agents/agents.selector';
import { AppState } from '../../../models/app-state';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [AgentsListComponent, AsyncPipe],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.css'
})
export class AgentsComponent {
  isLoading$!: Observable<boolean>;
  agents$!: Observable<Agents[]>;

  constructor(
    private store: Store<AppState>
  ) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.agents$ = this.store.pipe(select(agentListSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(loadAgentAction());
  }
}

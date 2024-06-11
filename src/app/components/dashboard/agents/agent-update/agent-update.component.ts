import { Component, ViewChild, viewChild } from '@angular/core';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Agents } from '../../../../models/agents';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../models/app-state';
import { getCurrentAgent } from '../../../../utils/Store/agents/agents.selector';
import { AsyncPipe } from '@angular/common';
import { AgentCrudAction, loadAction, loadAgentToUpdateAction } from '../../../../utils/Store/agents/agents.action';
import { ActivatedRoute } from '@angular/router';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-agent-update',
  standalone: true,
  imports: [
    AsyncPipe,
    ButtonModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './agent-update.component.html',
  styleUrl: './agent-update.component.css'
})
export class AgentUpdateComponent {
  agent?: Agents;
  agentUpdate!: Agents;
  @ViewChild('updateForm') updateForm!: NgForm;
  matricule = +(this.router.snapshot.paramMap.get('matricule')!);

  constructor(
    private router: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.store.pipe(select(getCurrentAgent)).subscribe(res => this.agent = res);
  }

  ngOnInit(): void {
    this.store.dispatch(loadAgentToUpdateAction({ matricule: this.matricule }));
  }

  updateAgentinfo(): void {
    console.log(this.updateForm.value)
    this.store.dispatch(loadAction.updateAction({ agent: this.updateForm.value }));
  }
}

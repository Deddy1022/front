import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast'
import { AppState } from '../../../../models/app-state';
import { AgentCrudAction, loadAction } from '../../../../utils/Store/agents/agents.action';
import { Agents } from '../../../../models/agents';

@Component({
  selector: 'app-agent-add',
  standalone: true,
  imports: [
    ButtonModule, 
    DropdownModule, 
    FormsModule, 
    ToastModule
  ],
  templateUrl: './agent-add.component.html',
  styleUrl: './agent-add.component.css'
})
export class AgentAddComponent {
  @ViewChild('form') form!: NgForm;
  genre = ['M', 'F'];
  private store = inject(Store<AppState>);

  ngOnInit(): void {
  }

  addAgent(): void {
    console.log(this.form.value)
    this.store.dispatch(loadAction.addAgent({ agent: this.form.value as Agents }))
  }
}

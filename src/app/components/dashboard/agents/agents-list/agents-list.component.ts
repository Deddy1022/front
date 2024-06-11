import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Agents } from '../../../../models/agents';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { loadAction } from '../../../../utils/Store/agents/agents.action';
import { AppState } from '../../../../models/app-state';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-agents-list',
  standalone: true,
  imports: [
    ButtonModule,
    ConfirmDialogModule,
    DropdownModule,
    FormsModule,
    RouterLink,
    TableModule
  ],
  templateUrl: './agents-list.component.html',
  styleUrl: './agents-list.component.css'
})
export class AgentsListComponent {
  @Input() agents: Array<Agents> = [];
  @Output() matricule = new EventEmitter<number>();
  action = ["Modifier", "Supprimer"];
  selectedAction: { [key: string]: string } = {};
  constructor(
    private confirmationService: ConfirmationService,
    private route: Router,
    private store: Store<AppState>
  ) { }

  handleAdd(): void {
    this.route.navigate(['dashboard/liste/ajouter']);
  }

  handleAction(matricule: number): void {
    let selected = this.selectedAction[matricule];
    if(selected === "Modifier") {
      this.route.navigate(['dashbord/update', matricule]);
    } else if(selected === "Supprimer") {
      this.onDelete(matricule);
    }
  }

  onDelete(matricule: number): void {
    this.confirmationService.confirm({
      message: 'Êtes-vous vraiment sûr de vouloir supprimer?',
      header: 'CONFIRMATION',
      icon: 'pi pi-info-circle',
      acceptLabel: "OUI",
      rejectLabel: "NON",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.store.dispatch(loadAction.deleteAction({ matricule }));
        // this.api.delete<MessageError>(`admin/employees/delete/${matricule}`).subscribe({
        //   next: (res) => {
        //     this.messageService.add({
        //       severity: 'info',
        //       summary: 'Agent Affecté',
        //       detail: res.message
        //     });
        //   },
        //   error: (res) => {
        //     this.messageService.add({
        //       severity: 'warn',
        //       summary: 'Annuler',
        //       detail: res.error
        //     });
        //   }
        // })
        this.selectedAction[matricule] = "";
      },
      reject: () => {
        this.selectedAction[matricule] = "";
      }
    })
  }

  countAgent () {}
}

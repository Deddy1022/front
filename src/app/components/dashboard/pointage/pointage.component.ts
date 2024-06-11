import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Agents } from '../../../models/agents';
import { AppState } from '../../../models/app-state';
import { Store } from '@ngrx/store';
import { agentListSelector } from '../../../utils/Store/agents/agents.selector';
import { loadAgentAction } from '../../../utils/Store/agents/agents.action';
import moment from 'moment';
import { pointageAction, pointageActionSuccess } from '../../../utils/Store/pointage/pointage.action';
import { PointageData } from '../../../models/pointages';

@Component({
  selector: 'app-pointage',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule
  ],
  templateUrl: './pointage.component.html',
  styleUrl: './pointage.component.css'
})
export class PointageComponent {
  agents: Agents[] = [];
  year = new Date().getFullYear();
  month = `${new Date().getMonth() + 1}`.padStart(2, "0");
  day = `${new Date().getDate()}`.padStart(2, "0");
  date = `${this.year}-${this.month}-${this.day}`;

  constructor(private store: Store<AppState>) {
    this.store.select(agentListSelector).subscribe(agents => this.agents = agents)
  }
  
  ngOnInit(): void {
    this.store.dispatch(loadAgentAction());
    this.store.dispatch(pointageAction.loadPointage());
  }

  setPointage(
    matricule: number, nom: string, 
    prenom: string, division: string, 
    enregistrement: string,
  ): void {
    const heurePointe = moment('08:00:00', 'HH:mm:ss'), insertionTime = moment();
    let retard: string;
    if(insertionTime.isAfter(heurePointe)) {
      const diff = moment.duration(insertionTime.diff(heurePointe));
      retard = moment.utc(diff.asMilliseconds()).format('HH:mm:ss');
    } else {
      retard = "";
    }
    const  data = {
      matricule: matricule,
      nom: nom,
      prenom: prenom,
      division: division,
      enregistrement: enregistrement,
      retard: retard
    }
    this.store.dispatch(pointageAction.addPointage({ pointage: data }));
  }

  setPointageSortie(matricule: number): void {
    let date = new Date(), year = date.getFullYear(), month = (date.getMonth() + 1).toString().padStart(2, "0"),
    day = (date.getDate()).toString().padStart(2, "0"), hours = date.getHours().toString().padStart(2, "0"),
    minutes = date.getMinutes().toString().padStart(2, "0"),
    seconds = date.getSeconds().toString().padStart(2, "0");
    const insertionSortie = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    const data = {
      matricule: matricule,
      insertion_sortie: insertionSortie
    };

    this.store.dispatch(pointageAction.pointageSortie({ pointage: data }))
  }
}

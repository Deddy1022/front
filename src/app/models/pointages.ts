import { EntityState } from "@ngrx/entity";

export interface PointageData {
  matricule: number;
  prenom?: string;
  division?: string;
  enregistrement?: string;
  retard?: string;
  insertion_sortie?: string;
  message?: string;
}

export interface Pointages {
  matricule: number;
  prenom: string;
  division: string;
  totalRetards: string
  totalHeures: string;
  joursSemaine: {
    Lundi: string | null;
    Mardi: string | null;
    Mercredi: string | null;
    Jeudi: string | null;
    Vendredi: string | null;
  }
}

export interface PointageState extends EntityState<Pointages> {
  loading: boolean;
  selectedIM: number;
  error: string
}
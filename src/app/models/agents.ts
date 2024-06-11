import { EntityState } from "@ngrx/entity";

export interface Agents {
  matricule: number;
  nom: string;
  prenom: string;
  division: string;
  grade: string;
  poste_actuel: string;
  categorie_actuelle: string;
  statut: string;
  indice: number;
  code_corps: string;
  corps: string;
  date_der_situation: string;
  date_entree_mef: string;
  date_naissance: string;
  prise_service: string;
  date_entree_admin: string;
  genre: string;
  adresse?: string;
  adresse_pro?: string;
  contact?: string;
  cin: number;
  delivrance?: string;
  duplicata?: string;
  situation_matrimoniale: string;
  urgence?: string;
  region?: string;
  message?: string;
}

export interface OnSuccess {
  agents: Agents;
  message: string
}

export interface AgentsState extends EntityState<Agents> {
  selectMatricule: number | null
  loading: boolean;
  error: string | null;
}

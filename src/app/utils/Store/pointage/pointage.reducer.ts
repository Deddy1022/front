import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Pointages } from "../../../models/pointages";
import { createReducer, on } from "@ngrx/store";
import { pointageAction, pointageActionSuccess } from "./pointage.action";

export const pointageReducerKey = 'pointages';

export const selectId = (info: Pointages): number => {
  return info.matricule;
}

export const pointageAdapter: EntityAdapter<Pointages> = createEntityAdapter<Pointages>({
  selectId: selectId
});

const initialState = pointageAdapter.getInitialState({
  loading: false,
  error: null
})

export const PointageReducer = createReducer(
  initialState,

  on(pointageAction.loadPointage, (state) => ({ ...state, loading: true })),

  on(pointageActionSuccess.loadPointageSuccess, (state, { pointages }) => pointageAdapter.addMany(pointages, { ...state, loading: false })),

  on(pointageAction.pointageSortie, (state, { pointage: { matricule } }) => ({ ...state, selecetdIM: matricule, loading: true })),

  on(pointageActionSuccess.pointageSortieSuccess, (state, { pointage }) => pointageAdapter.updateOne({id: pointage.matricule, changes: pointage}, { ...state, loading: false })),
)
import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { PointageData, Pointages } from "../../../models/pointages";

export const pointageAction = createActionGroup({
  source: 'Load API',
  events: {
    loadPointage: emptyProps(),
    addPointage: props<{ pointage: PointageData }>(),
    pointageSortie: props<{ pointage: PointageData }>()
  }
});
export const pointageActionSuccess = createActionGroup({
  source: 'Pointage API', 
  events: {
    loadPointageSuccess: props<{ pointages: Pointages[] }>(),
    addPointageSuccess: props<{ pointage: PointageData }>(),
    pointageSortieSuccess: props<{ pointage: PointageData }>(),
    pointageActionFailure: props<{ error: string | undefined}>()
  }
});
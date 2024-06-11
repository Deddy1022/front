import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from "../../../services/api.service";
import { pointageAction, pointageActionSuccess } from "./pointage.action";
import { catchError, map, merge, mergeMap, of } from "rxjs";
import { PointageData, Pointages } from "../../../models/pointages";
import { Injectable } from "@angular/core";

@Injectable()
export class PointageEffect {
  private URL = '';

  loadPointageData$ = createEffect(() => this.action$.pipe(
    ofType(pointageAction.loadPointage),
    mergeMap(() => this.apiService.get<Pointages[]>(``).pipe(
      map((data) => pointageActionSuccess.loadPointageSuccess({ pointages: data })),
      catchError(({ error }) => of(pointageActionSuccess.pointageActionFailure({ error: error.message })))
    ))
  ))

  addPointageData$ = createEffect(() => this.action$.pipe(
    ofType(pointageAction.addPointage),
    map(state => state.pointage),
    mergeMap((pointage) => this.apiService.post<PointageData>(``, pointage).pipe(
      map((data) => pointageActionSuccess.addPointageSuccess({ pointage: data })),
      catchError(({ error }) => of(pointageActionSuccess.pointageActionFailure({ error: error.message })))
    ))
  ))

  updatePointageData$ = createEffect(() => this.action$.pipe(
    ofType(pointageAction.pointageSortie),
    mergeMap(({ pointage }) => this.apiService.put<PointageData>(``, pointage)
      .pipe(
        map(() => pointageActionSuccess.pointageSortieSuccess({ pointage })),
        catchError(() => of(pointageActionSuccess.pointageActionFailure({ error: pointage.message })))
      )
    )
  ))

  constructor(
    private action$: Actions, 
    private apiService: ApiService
  ) {}
}
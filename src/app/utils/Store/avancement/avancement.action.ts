import { createAction, props } from "@ngrx/store";

export const avancementAction = createAction("[Avancement] get notification", props<{ notification: ReadonlyArray<Notification> }>());
import { createReducer, on } from "@ngrx/store";
import { Notification } from "../../../models/notification";
import { avancementAction } from "./avancement.action";

export const initialState: ReadonlyArray<Notification> = [];
export const avancementReducerKey = 'notification';

export const avancementReducer = createReducer(
  initialState,
  on(avancementAction, (state, { notification }) => notification)
)
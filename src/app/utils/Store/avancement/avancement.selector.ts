import { createFeatureSelector } from "@ngrx/store";
import { Notification } from "../../../models/notification";

export const avancementSelector = createFeatureSelector<ReadonlyArray<Notification>>('notification');
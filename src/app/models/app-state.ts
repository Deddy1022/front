import { AgentsState } from "./agents";
import { PointageState } from "./pointages";

export interface AppState {
  agents: AgentsState;
  pointages: PointageState
}

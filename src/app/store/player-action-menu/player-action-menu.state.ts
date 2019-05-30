import { PlayerActionMenuType } from "src/app/models/player-action-menu-type";

export interface PlayerActionMenuState {
  queuedMenuActions: PlayerActionMenuType[];
}

export const initialState: PlayerActionMenuState = {
  queuedMenuActions: []
};

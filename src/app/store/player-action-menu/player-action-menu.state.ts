import { PlayerActionMenuType } from "src/app/models/player-action-menu-type";

export interface IPlayerActionMenuState {
  queuedMenuActions: PlayerActionMenuType[];
}

export const initialState: IPlayerActionMenuState = {
  queuedMenuActions: []
};

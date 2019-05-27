import { PlayerActionMenuType } from "src/app/models/player-action-menu-type";

export interface PlayerActionMenuState {
  activeMenuType: PlayerActionMenuType;
}

export const initialState: PlayerActionMenuState = {
  activeMenuType: PlayerActionMenuType.PLACE_TILE
};

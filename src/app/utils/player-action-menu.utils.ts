import { PlayerActionMenuType } from "../models/player-action-menu-type";

const orderByPriority = (
  actionMenuTypes: PlayerActionMenuType[]
): PlayerActionMenuType[] => actionMenuTypes.sort((a, b) => a - b);

const findByHighestPriority = (
  actionMenuTypes: PlayerActionMenuType[]
): PlayerActionMenuType => orderByPriority(actionMenuTypes)[0];

export const PlayerActionMenuUtils = {
  orderByPriority,
  findByHighestPriority
};

import { PlayerActionMenuType } from "../models/player-action-menu-type";
import { PlayerActionMenuUtils } from "./player-action-menu.utils";

describe("PlayerActionMenuUtils", () => {
  describe("orderByPriority", () => {
    it("should return action menu types in the order of priority", () => {
      expect(
        PlayerActionMenuUtils.orderByPriority([
          PlayerActionMenuType.COMPUTER_MOVING,
          PlayerActionMenuType.END_TURN,
          PlayerActionMenuType.START_HOTEL_CHAIN
        ])
      ).toEqual([
        PlayerActionMenuType.START_HOTEL_CHAIN,
        PlayerActionMenuType.END_TURN,
        PlayerActionMenuType.COMPUTER_MOVING
      ]);
    });
  });

  describe("findByHighestPriority", () => {
    it("should return the highest priority action menu type", () => {
      expect(
        PlayerActionMenuUtils.findByHighestPriority([
          PlayerActionMenuType.END_TURN,
          PlayerActionMenuType.COMPUTER_MOVING,
          PlayerActionMenuType.START_HOTEL_CHAIN
        ])
      ).toEqual(PlayerActionMenuType.START_HOTEL_CHAIN);
    });

    it("should return undefined if list is empty", () => {
      expect(PlayerActionMenuUtils.findByHighestPriority([])).toBeUndefined();
    });
  });
});

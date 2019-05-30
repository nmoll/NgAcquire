import { PlayerActionMenuType } from "src/app/models/player-action-menu-type";
import { PlayerActionMenuActions } from "./player-action-menu.actions";
import { playerActionMenuReducer } from "./player-action-menu.reducer";
import {
  initialState,
  PlayerActionMenuState
} from "./player-action-menu.state";

describe("PlayerActionMenuReducer", () => {
  describe(PlayerActionMenuActions.updateActionMenuQueue.type, () => {
    it("should add a menu to the queue", () => {
      const action = PlayerActionMenuActions.updateActionMenuQueue({
        add: PlayerActionMenuType.PLACE_TILE,
        removeCurrent: false
      });

      const expected: PlayerActionMenuState = {
        queuedMenuActions: [PlayerActionMenuType.PLACE_TILE]
      };

      expect(playerActionMenuReducer(initialState, action)).toEqual(expected);
    });

    fit("should add a menu to the queue and keep the current menu if removeCurrent is false", () => {
      const state: PlayerActionMenuState = {
        queuedMenuActions: [PlayerActionMenuType.END_TURN]
      };

      const action = PlayerActionMenuActions.updateActionMenuQueue({
        add: PlayerActionMenuType.START_HOTEL_CHAIN,
        removeCurrent: false
      });

      const expected: PlayerActionMenuState = {
        queuedMenuActions: [
          PlayerActionMenuType.END_TURN,
          PlayerActionMenuType.START_HOTEL_CHAIN
        ]
      };

      expect(playerActionMenuReducer(state, action)).toEqual(expected);
    });

    it("should add a menu to the queue and remove the current menu if removeCurrent is true", () => {
      const state: PlayerActionMenuState = {
        queuedMenuActions: [PlayerActionMenuType.PLACE_TILE]
      };

      const action = PlayerActionMenuActions.updateActionMenuQueue({
        add: PlayerActionMenuType.END_TURN,
        removeCurrent: true
      });

      const expected: PlayerActionMenuState = {
        queuedMenuActions: [PlayerActionMenuType.END_TURN]
      };

      expect(playerActionMenuReducer(state, action)).toEqual(expected);
    });

    it("should remove the current menu", () => {
      const state: PlayerActionMenuState = {
        queuedMenuActions: [
          PlayerActionMenuType.END_TURN,
          PlayerActionMenuType.START_HOTEL_CHAIN
        ]
      };

      const action = PlayerActionMenuActions.updateActionMenuQueue({
        removeCurrent: true
      });

      const expected: PlayerActionMenuState = {
        // START_HOTEL_CHAIN is higher priority and should be removed
        queuedMenuActions: [PlayerActionMenuType.END_TURN]
      };

      expect(playerActionMenuReducer(state, action)).toEqual(expected);
    });

    it("should do nothing if no action and remove current is false", () => {
      const state: PlayerActionMenuState = {
        queuedMenuActions: [PlayerActionMenuType.PLACE_TILE]
      };

      const action = PlayerActionMenuActions.updateActionMenuQueue({
        removeCurrent: false
      });

      expect(playerActionMenuReducer(state, action)).toEqual(state);
    });
  });
});

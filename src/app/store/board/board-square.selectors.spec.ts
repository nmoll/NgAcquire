import { DefaultBoardConfig } from "src/app/config/board-config";
import { AppStateFactory } from "src/app/test/factory/app-state.factory";
import { BoardSquareFactory } from "src/app/test/factory/board-square.factory";
import { BoardUtils } from "src/app/utils/board.utils";
import { IAppState } from "../app-state";
import { BoardSquareSelectors } from "./board-square.selectors";

describe("BoardSquareSelectors", () => {
  describe("getSelectedBoardSquare", () => {
    let state: IAppState;

    beforeEach(() => {
      state = AppStateFactory.createAppState({
        boardSquareState: BoardSquareFactory.createBoardSquareState({
          boardSquares: [BoardSquareFactory.createBoardSquare({ id: 1 })]
        })
      });
    });

    it("should return selected board square", () => {
      state.boardSquareState.selectedBoardSquareId = 1;
      expect(BoardSquareSelectors.getSelectedBoardSquare(state)).toEqual(
        BoardSquareFactory.createBoardSquare({ id: 1 })
      );
    });

    it("should return null if no selected board square", () => {
      expect(BoardSquareSelectors.getSelectedBoardSquare(state)).toBeNull();
    });
  });

  describe("getAdjacentBoardSquares", () => {
    let state: IAppState;

    beforeEach(() => {
      state = AppStateFactory.createAppState({
        boardSquareState: BoardSquareFactory.createBoardSquareState({
          boardSquares: BoardUtils.createBoardSquares(DefaultBoardConfig)
        })
      });
    });

    it("should return adjacent boardSquares", () => {
      expect(
        BoardSquareSelectors.getAdjacentBoardSquares(state, {
          boardSquare: BoardSquareFactory.createBoardSquare({
            positionX: 1,
            positionY: 1
          })
        })
      ).toEqual([
        jasmine.objectContaining({ positionX: 2, positionY: 1 }),
        jasmine.objectContaining({ positionX: 1, positionY: 2 })
      ]);

      expect(
        BoardSquareSelectors.getAdjacentBoardSquares(state, {
          boardSquare: BoardSquareFactory.createBoardSquare({
            positionX: 3,
            positionY: 5
          })
        })
      ).toEqual([
        jasmine.objectContaining({ positionX: 4, positionY: 5 }),
        jasmine.objectContaining({ positionX: 3, positionY: 6 }),
        jasmine.objectContaining({ positionX: 2, positionY: 5 }),
        jasmine.objectContaining({ positionX: 3, positionY: 4 })
      ]);

      expect(
        BoardSquareSelectors.getAdjacentBoardSquares(state, {
          boardSquare: BoardSquareFactory.createBoardSquare({
            positionX: 12,
            positionY: 2
          })
        })
      ).toEqual([
        jasmine.objectContaining({ positionX: 12, positionY: 3 }),
        jasmine.objectContaining({ positionX: 11, positionY: 2 }),
        jasmine.objectContaining({ positionX: 12, positionY: 1 })
      ]);

      expect(
        BoardSquareSelectors.getAdjacentBoardSquares(state, {
          boardSquare: BoardSquareFactory.createBoardSquare({
            positionX: 12,
            positionY: 9
          })
        })
      ).toEqual([
        jasmine.objectContaining({ positionX: 11, positionY: 9 }),
        jasmine.objectContaining({ positionX: 12, positionY: 8 })
      ]);
    });
  });
});

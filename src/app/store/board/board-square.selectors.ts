import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AcquireEngine } from "src/app/engine/acquire-engine";
import { PlayerTurnSelectors } from "../player-turn/player-turn.selectors";
import { boardSquareAdapter, IBoardSquareState } from "./board-square.state";

const getBoardSquareState = createFeatureSelector<IBoardSquareState>(
  "boardSquareState"
);

const { selectAll: getAllBoardSquares } = boardSquareAdapter.getSelectors(
  getBoardSquareState
);

const getAllBoardSquareIds = createSelector(
  getBoardSquareState,
  state => state.ids as number[]
);

const getSelectedBoardSquareId = createSelector(
  getBoardSquareState,
  state => state.selectedBoardSquareId
);

const getLastTiledBoardSquareId = createSelector(
  getBoardSquareState,
  state => state.lastTiledBoardSquareId
);

const getTiledSquareIds = createSelector(
  getBoardSquareState,
  state => state.tiledBoardSquareIds
);

const getAllBoardSquaresWithState = createSelector(
  getAllBoardSquares,
  PlayerTurnSelectors.getAllPlayerTurns,
  (boardSquares, playerTurns) => {
    const initState = boardSquares.map(square => square.state);
    const computedStates = AcquireEngine.computeStateWithTurns(
      initState,
      playerTurns
    );

    return boardSquares.map((square, index) => ({
      ...square,
      state: computedStates[index]
    }));
  }
);

export const BoardSquareSelectors = {
  getAllBoardSquares,
  getAllBoardSquareIds,
  getSelectedBoardSquareId,
  getLastTiledBoardSquareId,
  getTiledSquareIds,
  getAllBoardSquaresWithState
};

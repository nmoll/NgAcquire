import { createReducer, on } from "@ngrx/store";
import { BoardSquareSelectedStateType } from "src/app/models/player-turn";
import { BoardSquareActions } from "../board/board-square.actions";
import { HumanPlayerActions } from "../player/player.actions";
import { initialState, playerTurnAdapter } from "./player-turn.state";

export const playerTurnReducer = createReducer(
  initialState,
  on(HumanPlayerActions.turnStarted, HumanPlayerActions.turnStarted, state =>
    playerTurnAdapter.addOne(
      {
        seq: 0,
        boardSquareOptionIds: [100, 12, 61, 76, 9, 54],
        boardSquareSelectedState: BoardSquareSelectedStateType.None()
      },
      state
    )
  ),
  on(BoardSquareActions.setSelectedBoardSquare, (state, { id }) =>
    playerTurnAdapter.updateOne(
      {
        id: 0,
        changes: {
          boardSquareSelectedState: BoardSquareSelectedStateType.Unconfirmed(id)
        }
      },
      state
    )
  ),
  on(HumanPlayerActions.confirmTilePlacement, (state, { boardSquareId }) =>
    playerTurnAdapter.updateOne(
      {
        id: 0,
        changes: {
          boardSquareOptionIds: state.entities[0].boardSquareOptionIds.filter(
            id => id != boardSquareId
          ),
          boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
            boardSquareId
          )
        }
      },
      state
    )
  )
);

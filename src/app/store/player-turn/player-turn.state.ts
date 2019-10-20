import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { IPlayerTurn } from "src/app/models/player-turn";

export interface IPlayerTurnState extends EntityState<IPlayerTurn> {}

export const playerTurnAdapter = createEntityAdapter<IPlayerTurn>({
  selectId: playerTurn => playerTurn.seq,
  sortComparer: (a, b) => a.seq - b.seq
});

export const initialState: IPlayerTurnState = playerTurnAdapter.getInitialState();

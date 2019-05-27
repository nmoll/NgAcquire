import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { IPlayer } from "src/app/models/player";

export interface PlayerState extends EntityState<IPlayer> {
  currentPlayerId: number | null;
}

export const playerAdapter = createEntityAdapter<IPlayer>();

export const initialState: PlayerState = playerAdapter.getInitialState({
  currentPlayerId: null
});

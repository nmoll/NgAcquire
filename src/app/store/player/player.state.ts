import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { IPlayer } from "src/app/models/player";

export interface IPlayerState extends EntityState<IPlayer> {
  currentPlayerId: number | null;
}

export const playerAdapter = createEntityAdapter<IPlayer>();

export const initialState: IPlayerState = playerAdapter.getInitialState({
  currentPlayerId: null
});

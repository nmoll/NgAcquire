import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { IBoardSquare } from "src/app/models/board-square";
import { IHotelChain } from "src/app/models/hotel-chain";
import { IPlayer } from "src/app/models/player";

export const PlayerActions = {
  loadPlayers: createAction("[Players] Load Players"),

  loadPlayersSuccess: createAction(
    "[Players] Load Players Success",
    props<{ players: IPlayer[] }>()
  ),

  setCurrentPlayer: createAction(
    "[Players] Set Current Player",
    props<{ id: number }>()
  ),

  updatePlayer: createAction(
    "[Players] Update Player",
    props<{ update: Update<IPlayer> }>()
  )
};

export const HumanPlayerActions = {
  turnStarted: createAction("[Human Player] Turn Started"),

  confirmTilePlacement: createAction(
    "[Human Player] Confirm Tile Placement",
    props<{ boardSquare: IBoardSquare }>()
  ),

  starterTilePlayed: createAction("[Human Player] Starter Tile Played"),

  starterHotelChainChosen: createAction(
    "[Human Player] Starter Hotel Chain Chosen",
    props<{ hotelChain: IHotelChain }>()
  ),

  endTurn: createAction("[Human Player] End Turn")
};

export const ComputerPlayerActions = {
  turnStarted: createAction("[Computer Player] Turn Started"),

  confirmTilePlacement: createAction(
    "[Computer Player] Confirm Tile Placement",
    props<{ boardSquare: IBoardSquare }>()
  ),

  starterTilePlayed: createAction("[Computer Player] Starter Tile Played"),

  starterHotelChainChosen: createAction(
    "[Computer Player] Starter Hotel Chain Chosen",
    props<{ hotelChain: IHotelChain }>()
  ),

  endTurn: createAction("[Computer Player] End Turn")
};

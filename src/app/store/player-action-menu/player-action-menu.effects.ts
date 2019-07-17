import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, withLatestFrom } from "rxjs/operators";
import { PlayerActionMenuType } from "src/app/models/player-action-menu-type";
import {
  ComputerPlayerActions,
  HumanPlayerActions
} from "../player/player.actions";
import { TileFacade } from "../tile/tile.facade";
import { PlayerActionMenuActions } from "./player-action-menu.actions";

@Injectable({
  providedIn: "root"
})
export class PlayerActionMenuEffects {
  constructor(private actions$: Actions, private tileFacade: TileFacade) {}

  showEndTurnMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HumanPlayerActions.confirmTilePlacement),
      map(_ =>
        PlayerActionMenuActions.updateActionMenuQueue({
          add: PlayerActionMenuType.END_TURN,
          removeCurrent: true
        })
      )
    )
  );

  showChooseHotelChainToStartMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HumanPlayerActions.confirmTilePlacement),
      withLatestFrom(this.tileFacade.adjacentTilesIdsToLastPlayed$),
      filter(([_, tiles]) => tiles.length > 0),
      map(_ =>
        PlayerActionMenuActions.updateActionMenuQueue({
          add: PlayerActionMenuType.START_HOTEL_CHAIN,
          removeCurrent: false
        })
      )
    )
  );

  removeChooseHotelChainToStartMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HumanPlayerActions.starterHotelChainChosen),
      map(_ =>
        PlayerActionMenuActions.updateActionMenuQueue({
          removeCurrent: true
        })
      )
    )
  );

  showPlaceTileMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HumanPlayerActions.turnStarted),
      map(_ =>
        PlayerActionMenuActions.updateActionMenuQueue({
          add: PlayerActionMenuType.PLACE_TILE,
          removeCurrent: true
        })
      )
    )
  );

  showComputerMovingMenu$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComputerPlayerActions.turnStarted),
      map(_ =>
        PlayerActionMenuActions.updateActionMenuQueue({
          add: PlayerActionMenuType.COMPUTER_MOVING,
          removeCurrent: true
        })
      )
    )
  );
}

interface IPlayerTurn {
  seq: number;
  playerId: number;
  selectedBoardSquareId: number;
  selectedHotelId?: number;
  purchasedStocks?: number[];
}

const turns: IPlayerTurn[] = [
  {
    seq: 1,
    playerId: 1,
    selectedBoardSquareId: 5
  },
  {
    seq: 2,
    playerId: 2,
    selectedBoardSquareId: 10
  },
  {
    seq: 3,
    playerId: 1,
    selectedBoardSquareId: 6,
    selectedHotelId: 1
  }
];

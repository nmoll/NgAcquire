import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { filter, map, mergeMap, withLatestFrom } from "rxjs/operators";
import {
  DefaultPlayerConfig,
  IPlayerConfig
} from "src/app/config/player-config";
import { IPlayer } from "src/app/models/player";
import { PlayerUtils } from "src/app/utils/player.utils";
import { TileUtils } from "src/app/utils/tile.utils";
import { PlayerActionMenuActions } from "../player-action-menu/player-action-menu.actions";
import { TileFacade } from "../tile/tile.facade";
import { PlayerActions } from "./player.actions";
import { PlayerFacade } from "./player.facade";

@Injectable({
  providedIn: "root"
})
export class PlayerEffects {
  constructor(
    private actions$: Actions,
    private tileFacade: TileFacade,
    private playerFacade: PlayerFacade
  ) {}

  loadPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.loadPlayers),
      mergeMap(() =>
        this.mockGetPlayers(DefaultPlayerConfig).pipe(
          map(players => PlayerActions.loadPlayersSuccess({ players }))
        )
      )
    )
  );

  pickTilesOnTurnStart$ = createEffect(() =>
    this.playerFacade.currentPlayer$.pipe(
      filter(
        player =>
          player && player.tiles.length < DefaultPlayerConfig.maxTilesInHand
      ),
      withLatestFrom(this.tileFacade.tilesInBag$),
      map(([player, tiles]) =>
        PlayerActions.updatePlayer({
          update: {
            id: player.id,
            changes: {
              tiles: [
                ...player.tiles,
                ...TileUtils.pickRandomTiles(
                  DefaultPlayerConfig.maxTilesInHand - player.tiles.length,
                  tiles
                )
              ]
            }
          }
        })
      )
    )
  );

  removePlayerTileOnConfirmPlace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActionMenuActions.confirmTilePlacement),
      withLatestFrom(this.playerFacade.currentPlayer$),
      map(([{ boardSquare }, player]) =>
        PlayerActions.updatePlayer({
          update: {
            id: player.id,
            changes: {
              tiles: [
                ...player.tiles.filter(
                  tile => tile.boardSquareId !== boardSquare.id
                )
              ]
            }
          }
        })
      )
    )
  );

  endTurn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActionMenuActions.endTurn),
      withLatestFrom(
        this.playerFacade.currentPlayer$,
        this.playerFacade.players$
      ),
      map(([_, currentPlayer, players]) =>
        PlayerActions.setCurrentPlayer({
          id: PlayerUtils.getNextPlayer(currentPlayer, players).id
        })
      )
    )
  );

  private mockGetPlayers(playerConfig: IPlayerConfig): Observable<IPlayer[]> {
    return of([
      {
        id: 1,
        name: "Nate",
        cash: playerConfig.startingCash,
        tiles: []
      },
      {
        id: 2,
        name: "Kate",
        cash: playerConfig.startingCash,
        tiles: []
      },
      {
        id: 3,
        name: "Computer",
        cash: playerConfig.startingCash,
        tiles: []
      }
    ]);
  }
}

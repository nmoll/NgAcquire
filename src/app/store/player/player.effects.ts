import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { delay, filter, map, mergeMap, withLatestFrom } from "rxjs/operators";
import {
  DefaultPlayerConfig,
  IPlayerConfig
} from "src/app/config/player-config";
import { IPlayer, PlayerType } from "src/app/models/player";
import { PlayerUtils } from "src/app/utils/player.utils";
import { TileUtils } from "src/app/utils/tile.utils";
import { TileFacade } from "../tile/tile.facade";
import {
  ComputerPlayerActions,
  HumanPlayerActions,
  PlayerActions
} from "./player.actions";
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
      withLatestFrom(this.tileFacade.tilesInBag$),
      mergeMap(([_, tileIds]) => {
        return this.mockGetPlayers(DefaultPlayerConfig).pipe(
          map(players => PlayerUtils.initPlayerTiles(players, tileIds)),
          map(players => PlayerActions.loadPlayersSuccess({ players }))
        );
      })
    )
  );

  startTurn$ = createEffect(() =>
    this.playerFacade.currentPlayerChanged$.pipe(
      map(player =>
        player.playerType === PlayerType.HUMAN
          ? HumanPlayerActions.turnStarted
          : ComputerPlayerActions.turnStarted
      )
    )
  );

  removePlayerTileOnConfirmPlace$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        HumanPlayerActions.confirmTilePlacement,
        ComputerPlayerActions.confirmTilePlacement
      ),
      withLatestFrom(this.playerFacade.currentPlayer$),
      map(([{ boardSquareId }, player]) =>
        PlayerActions.updatePlayer({
          update: {
            id: player.id,
            changes: {
              tileIds: player.tileIds.filter(tileId => tileId !== boardSquareId)
            }
          }
        })
      )
    )
  );

  tilePlacedByComputer = createEffect(() =>
    this.actions$.pipe(
      ofType(ComputerPlayerActions.confirmTilePlacement),
      withLatestFrom(this.playerFacade.currentPlayer$),
      filter(([_, player]) => player.playerType === PlayerType.COMPUTER),
      map(_ => ComputerPlayerActions.endTurn()),
      delay(1000)
    )
  );

  computerMove$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComputerPlayerActions.turnStarted),
      withLatestFrom(this.playerFacade.currentPlayer$),
      map(([_, player]) =>
        ComputerPlayerActions.confirmTilePlacement({
          boardSquareId: player.tileIds[0]
        })
      ),
      delay(1000)
    )
  );

  pickTileOnTurnEnd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HumanPlayerActions.endTurn, ComputerPlayerActions.endTurn),
      withLatestFrom(
        this.playerFacade.currentPlayer$,
        this.tileFacade.tilesInBag$
      ),
      map(([_, player, tiles]) =>
        PlayerActions.updatePlayer({
          update: {
            id: player.id,
            changes: {
              tileIds: [
                ...player.tileIds,
                ...TileUtils.pickRandomTiles(1, tiles)
              ]
            }
          }
        })
      )
    )
  );

  rotatePlayerOnTurnEnd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HumanPlayerActions.endTurn, ComputerPlayerActions.endTurn),
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
        tileIds: [],
        playerType: PlayerType.HUMAN
      },
      {
        id: 2,
        name: "Kate",
        cash: playerConfig.startingCash,
        tileIds: [],
        playerType: PlayerType.HUMAN
      },
      {
        id: 3,
        name: "Computer",
        cash: playerConfig.startingCash,
        tileIds: [],
        playerType: PlayerType.COMPUTER
      }
    ]);
  }
}

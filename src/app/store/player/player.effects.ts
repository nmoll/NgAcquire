import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { delay, filter, map, mergeMap, withLatestFrom } from "rxjs/operators";
import {
  DefaultPlayerConfig,
  IPlayerConfig
} from "src/app/config/player-config";
import { IPlayer, PlayerType } from "src/app/models/player";
import { BoardUtils } from "src/app/utils/board.utils";
import { PlayerUtils } from "src/app/utils/player.utils";
import { TileUtils } from "src/app/utils/tile.utils";
import { BoardSquareFacade } from "../board/board-square.facade";
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
    private playerFacade: PlayerFacade,
    private boardSquareFacade: BoardSquareFacade
  ) {}

  loadPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerActions.loadPlayers),
      withLatestFrom(this.tileFacade.tilesInBag$),
      mergeMap(([_, tiles]) => {
        return this.mockGetPlayers(DefaultPlayerConfig).pipe(
          map(players => PlayerUtils.initPlayerTiles(players, tiles)),
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
      map(([{ boardSquare }, player]) =>
        PlayerActions.updatePlayer({
          update: {
            id: player.id,
            changes: {
              tiles: TileUtils.removeTileById(player.tiles, boardSquare.id)
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
      withLatestFrom(
        this.playerFacade.currentPlayer$,
        this.boardSquareFacade.boardSquares$
      ),
      map(([_, player, boardSquares]) =>
        ComputerPlayerActions.confirmTilePlacement({
          boardSquare: BoardUtils.findByPosition(
            player.tiles[0].positionX,
            player.tiles[0].positionY,
            boardSquares
          )
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
              tiles: [...player.tiles, ...TileUtils.pickRandomTiles(1, tiles)]
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
        tiles: [],
        playerType: PlayerType.HUMAN
      },
      {
        id: 2,
        name: "Kate",
        cash: playerConfig.startingCash,
        tiles: [],
        playerType: PlayerType.HUMAN
      },
      {
        id: 3,
        name: "Computer",
        cash: playerConfig.startingCash,
        tiles: [],
        playerType: PlayerType.COMPUTER
      }
    ]);
  }
}

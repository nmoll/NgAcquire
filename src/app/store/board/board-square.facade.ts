import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DefaultBoardConfig } from "src/app/config/board-config";
import { IBoardSquare } from "src/app/models/board-square";
import {
  BoardSquareState,
  BoardSquareStateType
} from "src/app/models/board-square-state";
import { PlayerActionMenuType } from "src/app/models/player-action-menu-type";
import { BoardUtils } from "src/app/utils/board.utils";
import { HotelChainSelectors } from "../hotel-chain/hotel-chain.selectors";
import { PlayerActionMenuSelectors } from "../player-action-menu/player-action-menu.selectors";
import { PlayerSelectors } from "../player/player.selectors";
import { BoardSquareActions } from "./board-square.actions";
import { BoardSquareSelectors } from "./board-square.selectors";
import { IBoardSquareState } from "./board-square.state";

@Injectable({
  providedIn: "root"
})
export class BoardSquareFacade {
  public boardSquares$: Observable<IBoardSquare[]>;

  public selectedBoardSquareId$: Observable<number>;

  constructor(private store: Store<IBoardSquareState>) {
    this.boardSquares$ = combineLatest(
      this.store.select(BoardSquareSelectors.getAllBoardSquares),
      this.store.select(BoardSquareSelectors.getTiledSquareIds),
      this.store.select(BoardSquareSelectors.getSelectedBoardSquareId),
      this.store.select(HotelChainSelectors.getAllHotelChains),
      this.store.select(PlayerSelectors.getCurrentPlayerTiles),
      this.store.select(PlayerActionMenuSelectors.getActiveMenuType)
    ).pipe(
      map(
        ([
          boardSquares,
          tiledSquareIds,
          selectedId,
          hotelChains,
          playerTiles,
          activeMenuType
        ]) =>
          boardSquares.map(square => {
            let state: BoardSquareState = BoardSquareStateType.None();
            let hotelChain = hotelChains.find(hotelChain =>
              hotelChain.tileIds.includes(square.id)
            );
            if (hotelChain) {
              state = BoardSquareStateType.HasHotelChain(hotelChain.type);
            } else if (selectedId === square.id) {
              state = BoardSquareStateType.Selected();
            } else if (tiledSquareIds.includes(square.id)) {
              state = BoardSquareStateType.HasTile();
            } else if (
              activeMenuType === PlayerActionMenuType.PLACE_TILE &&
              playerTiles.includes(square.id)
            ) {
              state = BoardSquareStateType.AvailableForSelection();
            }
            return {
              ...square,
              state
            };
          })
      )
    );

    this.selectedBoardSquareId$ = this.store.pipe(
      select(BoardSquareSelectors.getSelectedBoardSquareId)
    );
  }

  public loadBoardSquares() {
    this.store.dispatch(
      BoardSquareActions.setBoardSquares({
        boardSquares: BoardUtils.createBoardSquares(DefaultBoardConfig)
      })
    );
  }

  public select(boardSquare: IBoardSquare) {
    this.store.dispatch(
      BoardSquareActions.setSelectedBoardSquare({ id: boardSquare.id })
    );
  }
}

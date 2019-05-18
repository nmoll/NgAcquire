import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { filter, withLatestFrom } from "rxjs/operators";
import { IPlayer } from "../player/player";
import { PlayerService } from "../player/player.service";
import { ITile } from "../tile/tile";
import { DefaultBoardConfig } from "./board-configuration";
import { BoardSquareState, IBoardSquare } from "./board-square";
import * as BoardUtils from "./board.utils";

const findTileByBoardSquareId = (tiles: ITile[], boardSquareId: number) =>
  tiles.find(tile => tile.boardSquareId === boardSquareId);

@Injectable({
  providedIn: "root"
})
export class BoardService {
  public boardSquares$: BehaviorSubject<IBoardSquare[]>;

  public selectedBoardSquare$ = new Subject<IBoardSquare>();

  constructor(private playerService: PlayerService) {
    this.boardSquares$ = new BehaviorSubject(
      BoardUtils.createBoardSquares(DefaultBoardConfig)
    );

    this.playerService.currentPlayer$
      .pipe(withLatestFrom(this.boardSquares$))
      .subscribe(([player, boardSquares]) =>
        this.updateStateOnCurrentPlayerChange(player, boardSquares)
      );

    this.selectedBoardSquare$
      .pipe(
        filter(BoardUtils.canSelectBoardSquare),
        withLatestFrom(this.boardSquares$)
      )
      .subscribe(([selected, boardSquares]) =>
        this.updateStateOnBoardSelection(selected, boardSquares)
      );
  }

  public selectBoardSquare(boardSquare: IBoardSquare) {
    this.selectedBoardSquare$.next(boardSquare);
  }

  private updateStateOnBoardSelection(
    selected: IBoardSquare,
    boardSquares: IBoardSquare[]
  ): void {
    const updatedBoardSquares = boardSquares.map(boardSquare => {
      let state = boardSquare.state;
      if (
        boardSquare.id != selected.id &&
        BoardUtils.canSelectBoardSquare(boardSquare)
      ) {
        state = BoardSquareState.AVAILABLE_FOR_SELECTION;
      } else if (boardSquare.id === selected.id) {
        state = BoardSquareState.SELECTED;
      }

      return {
        ...boardSquare,
        state
      };
    });

    this.boardSquares$.next(updatedBoardSquares);
  }

  private updateStateOnCurrentPlayerChange(
    player: IPlayer,
    boardSquares: IBoardSquare[]
  ): void {
    const updatedBoardSquares = boardSquares.map(boardSquare => ({
      ...boardSquare,
      state: this.getBoardSquareState(boardSquare, player)
    }));

    this.boardSquares$.next(updatedBoardSquares);
  }

  private getBoardSquareState(
    boardSquare: IBoardSquare,
    currentPlayer: IPlayer
  ): BoardSquareState {
    return findTileByBoardSquareId(currentPlayer.tiles, boardSquare.id)
      ? BoardSquareState.AVAILABLE_FOR_SELECTION
      : BoardSquareState.DEFAULT;
  }
}

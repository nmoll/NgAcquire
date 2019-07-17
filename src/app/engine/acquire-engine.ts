import {
  BoardSquareState,
  BoardSquareStateType
} from "../models/board-square-state";
import { IPlayerTurn } from "../models/player-turn";

const getIndex = (positionX: number, positionY: number) =>
  positionX + positionY * 12;

const findByPosition = (
  positionX: number,
  positionY: number,
  boardStates: BoardSquareState[]
): BoardSquareState => boardStates[getIndex(positionX, positionY)];

const getPositionX = (index: number) => index % 12;
const getPositionY = (index: number) => Math.floor(index / 12);

const getAdjacentPositions = (
  boardStates: BoardSquareState[],
  index: number
): number[] =>
  [
    getIndex(getPositionX(index) - 1, getPositionY(index)),
    getIndex(getPositionX(index) + 1, getPositionY(index)),
    getIndex(getPositionX(index), getPositionY(index) - 1),
    getIndex(getPositionX(index), getPositionY(index) + 1)
  ].filter(index => index >= 0 && index < boardStates.length);

const getAdjacentStates = (
  boardStates: BoardSquareState[],
  index: number
): BoardSquareState[] =>
  [
    findByPosition(getPositionX(index) - 1, getPositionY(index), boardStates),
    findByPosition(getPositionX(index) + 1, getPositionY(index), boardStates),
    findByPosition(getPositionX(index), getPositionY(index) - 1, boardStates),
    findByPosition(getPositionX(index), getPositionY(index) + 1, boardStates)
  ].filter(index => !!index);

const getAvailableForSelectionState = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn,
  index: number
): BoardSquareState | false =>
  playerTurn.boardSquareOptionIds.includes(index)
    ? BoardSquareStateType.AvailableForSelection()
    : false;

const getSelectedState = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn,
  index: number
): BoardSquareState | false =>
  playerTurn.boardSquareSelectedState.type === "Unconfirmed" &&
  playerTurn.boardSquareSelectedState.boardSquareId === index
    ? BoardSquareStateType.Selected()
    : false;

const getHasTileState = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn,
  index: number
): BoardSquareState | false =>
  playerTurn.boardSquareSelectedState.type === "Confirmed" &&
  playerTurn.boardSquareSelectedState.boardSquareId === index
    ? BoardSquareStateType.HasTile()
    : false;

const getPendingHotelState = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn,
  index: number
): BoardSquareState | false =>
  playerTurn.boardSquareSelectedState.type === "Confirmed" &&
  ((playerTurn.boardSquareSelectedState.boardSquareId === index &&
    !!getAdjacentStates(boardState, index).find(
      state => state.type === "HasTile"
    )) ||
    (boardState[index].type === "HasTile" &&
      getAdjacentPositions(
        boardState,
        playerTurn.boardSquareSelectedState.boardSquareId
      ).includes(index)))
    ? BoardSquareStateType.PendingHotel()
    : false;

const getHasHotelChainState = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn,
  index: number
): BoardSquareState | false =>
  (playerTurn.boardSquareSelectedState.type === "Confirmed" &&
    ((boardState[index].type === "PendingHotel" &&
    !!playerTurn.selectedHotelChain
      ? BoardSquareStateType.HasHotelChain(playerTurn.selectedHotelChain)
      : false) ||
      (playerTurn.boardSquareSelectedState.boardSquareId === index
        ? getAdjacentStates(
            boardState,
            playerTurn.boardSquareSelectedState.boardSquareId
          ).find(state => state.type === "HasHotelChain") || false
        : false))) ||
  false;

const getBoardSquareState = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn,
  idx: number
): BoardSquareState =>
  getHasHotelChainState(boardState, playerTurn, idx) ||
  getPendingHotelState(boardState, playerTurn, idx) ||
  getSelectedState(boardState, playerTurn, idx) ||
  getAvailableForSelectionState(boardState, playerTurn, idx) ||
  getHasTileState(boardState, playerTurn, idx) ||
  null;

const computeNewBoardState = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn
): BoardSquareState[] =>
  boardState && playerTurn
    ? boardState.map((_, idx) =>
        getBoardSquareState(boardState, playerTurn, idx)
      )
    : boardState || [];

export const AcquireEngine = {
  computeNewBoardState
};

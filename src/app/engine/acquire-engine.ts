import {
  BoardSquareState,
  BoardSquareStateType
} from "../models/board-square-state";
import { HotelChainType } from "../models/hotel-chain";
import { IPlayerTurn } from "../models/player-turn";

const getIndex = (positionX: number, positionY: number) =>
  positionX + positionY * 12;

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
  getAdjacentPositions(boardStates, index).map(index => boardStates[index]);

const getAdjacentHotelChains = (
  boardState: BoardSquareState[],
  index: number
): BoardSquareState[] =>
  getAdjacentStates(boardState, index).filter(
    state => state.type === "HasHotelChain"
  );

const getAdjacentTiles = (
  boardState: BoardSquareState[],
  index: number
): BoardSquareState[] =>
  getAdjacentStates(boardState, index).filter(
    state => state.type === "HasTile"
  );

const hasAdjacentTiles = (
  boardState: BoardSquareState[],
  index: number
): boolean => getAdjacentTiles(boardState, index).length > 0;

const isAdjacent = (
  boardState: BoardSquareState[],
  aIndex: number,
  bIndex: number
): boolean => getAdjacentPositions(boardState, aIndex).includes(bIndex);

const isPlacedThisTurn = (playerTurn: IPlayerTurn, index: number): boolean =>
  playerTurn.boardSquareSelectedState.type === "Confirmed" &&
  playerTurn.boardSquareSelectedState.boardSquareId === index;

const isUnconfirmedSelection = (
  playerTurn: IPlayerTurn,
  index: number
): boolean =>
  playerTurn.boardSquareSelectedState.type === "Unconfirmed" &&
  playerTurn.boardSquareSelectedState.boardSquareId === index;

const isTileAdjacentToConfirmedSelection = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn,
  index: number
): boolean =>
  boardState[index].type === "HasTile" &&
  playerTurn.boardSquareSelectedState.type === "Confirmed" &&
  isAdjacent(
    boardState,
    playerTurn.boardSquareSelectedState.boardSquareId,
    index
  );

const playerHasSelectedHotel = (playerTurn: IPlayerTurn): boolean =>
  playerTurn.boardSquareSelectedState.type === "Confirmed" &&
  !!playerTurn.selectedHotelChain;

const isPendingHotel = (
  boardState: BoardSquareState[],
  index: number
): boolean => boardState[index].type === "PendingHotel";

const getLargestHotelChain = (
  boardState: BoardSquareState[],
  hotelChains: BoardSquareState[]
): BoardSquareState =>
  hotelChains.sort(
    (a, b) =>
      findAllMatchingHotelChains(boardState, b).length -
      findAllMatchingHotelChains(boardState, a).length
  )[0];

const getMinorityHotelChain = (
  boardState: BoardSquareState[],
  hotelChains: BoardSquareState[]
): BoardSquareState =>
  hotelChains.sort(
    (a, b) =>
      findAllMatchingHotelChains(boardState, b).length -
      findAllMatchingHotelChains(boardState, a).length
  )[1];

const getHotelChainType = (
  boardState: BoardSquareState
): HotelChainType | null =>
  boardState.type === "HasHotelChain" ? boardState.hotelChainType : null;

const isSameHotelChain = (a: BoardSquareState, b: BoardSquareState): boolean =>
  a &&
  b &&
  a.type === "HasHotelChain" &&
  b.type === "HasHotelChain" &&
  getHotelChainType(a) === getHotelChainType(b);

const findAllMatchingHotelChains = (
  boardState: BoardSquareState[],
  squareState: BoardSquareState
) => boardState.filter(state => isSameHotelChain(state, squareState));

const isPartOfMinorityHotelInMerge = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn,
  index: number
): boolean =>
  playerTurn.boardSquareSelectedState.type === "Confirmed"
    ? isSameHotelChain(
        getMinorityHotelChain(
          boardState,
          getAdjacentHotelChains(
            boardState,
            playerTurn.boardSquareSelectedState.boardSquareId
          )
        ),
        boardState[index]
      )
    : false;

const Scenario = {
  getAvailableForSelectionState: (
    boardState: BoardSquareState[],
    playerTurn: IPlayerTurn,
    index: number
  ): BoardSquareState | false =>
    playerTurn.boardSquareOptionIds.includes(index)
      ? BoardSquareStateType.AvailableForSelection()
      : false,

  getSelectedState: (
    boardState: BoardSquareState[],
    playerTurn: IPlayerTurn,
    index: number
  ): BoardSquareState | false =>
    isUnconfirmedSelection(playerTurn, index)
      ? BoardSquareStateType.Selected()
      : false,

  getHasTileState: (
    boardState: BoardSquareState[],
    playerTurn: IPlayerTurn,
    index: number
  ): BoardSquareState | false =>
    isPlacedThisTurn(playerTurn, index)
      ? BoardSquareStateType.HasTile()
      : false,

  getPendingHotelState: (
    boardState: BoardSquareState[],
    playerTurn: IPlayerTurn,
    index: number
  ): BoardSquareState | false =>
    (isPlacedThisTurn(playerTurn, index) &&
      hasAdjacentTiles(boardState, index)) ||
    isTileAdjacentToConfirmedSelection(boardState, playerTurn, index)
      ? BoardSquareStateType.PendingHotel()
      : false,

  getHasHotelChainState: (
    boardState: BoardSquareState[],
    playerTurn: IPlayerTurn,
    index: number
  ): BoardSquareState | false =>
    (playerTurn.boardSquareSelectedState.type === "Confirmed" &&
    (isPlacedThisTurn(playerTurn, index) ||
      isPartOfMinorityHotelInMerge(boardState, playerTurn, index))
      ? getLargestHotelChain(
          boardState,
          getAdjacentHotelChains(
            boardState,
            playerTurn.boardSquareSelectedState.boardSquareId
          )
        )
      : false) ||
    (isPlacedThisTurn(playerTurn, index) &&
    hasAdjacentTiles(boardState, index) &&
    playerHasSelectedHotel(playerTurn)
      ? BoardSquareStateType.HasHotelChain(playerTurn.selectedHotelChain)
      : false) ||
    (isTileAdjacentToConfirmedSelection(boardState, playerTurn, index) &&
    playerHasSelectedHotel(playerTurn)
      ? BoardSquareStateType.HasHotelChain(playerTurn.selectedHotelChain)
      : false) ||
    (isPendingHotel(boardState, index) && playerHasSelectedHotel(playerTurn)
      ? BoardSquareStateType.HasHotelChain(playerTurn.selectedHotelChain)
      : false) ||
    false,

  getCurrentState: (
    boardState: BoardSquareState[],
    playerTurn: IPlayerTurn,
    index: number
  ): BoardSquareState => boardState[index]
};

const getBoardSquareState = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn,
  index: number
): BoardSquareState =>
  Scenario.getHasHotelChainState(boardState, playerTurn, index) ||
  Scenario.getPendingHotelState(boardState, playerTurn, index) ||
  Scenario.getSelectedState(boardState, playerTurn, index) ||
  Scenario.getAvailableForSelectionState(boardState, playerTurn, index) ||
  Scenario.getHasTileState(boardState, playerTurn, index) ||
  Scenario.getCurrentState(boardState, playerTurn, index);

const computeStateWithTurn = (
  boardState: BoardSquareState[],
  playerTurn: IPlayerTurn
): BoardSquareState[] =>
  boardState && playerTurn
    ? boardState.map((_, index) =>
        getBoardSquareState(boardState, playerTurn, index)
      )
    : boardState || [];

const computeStateWithTurns = (
  boardState: BoardSquareState[],
  playerTurns: IPlayerTurn[]
): BoardSquareState[] =>
  playerTurns.length > 0
    ? computeStateWithTurns(
        computeStateWithTurn(boardState, playerTurns.shift()),
        playerTurns
      )
    : boardState;

export const AcquireEngine = {
  computeStateWithTurn,
  computeStateWithTurns
};

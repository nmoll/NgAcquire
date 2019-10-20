import {
  BoardSquareSelectedStateType,
  IPlayerTurn
} from "src/app/models/player-turn";

const createPlayerTurn = (props: Partial<IPlayerTurn>): IPlayerTurn => ({
  seq: 0,
  boardSquareSelectedState: BoardSquareSelectedStateType.None(),
  boardSquareOptionIds: [],
  ...props
});

export const PlayerTurnFactory = {
  createPlayerTurn
};

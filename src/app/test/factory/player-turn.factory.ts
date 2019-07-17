import { IPlayerTurn } from "src/app/models/player-turn";

const createPlayerTurn = (props: Partial<IPlayerTurn>): IPlayerTurn => ({
  selectedBoardSquareId: null,
  boardSquareOptionIds: [],
  ...props
});

export const PlayerTurnFactory = {
  createPlayerTurn
};

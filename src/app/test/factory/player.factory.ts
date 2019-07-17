import { IPlayer, PlayerType } from "src/app/models/player";
import { IPlayerState, playerAdapter } from "src/app/store/player/player.state";

const createPlayer = ({
  id = 0,
  name = "",
  cash = 0,
  tileIds = [],
  playerType = PlayerType.HUMAN
}): IPlayer => ({
  id,
  name,
  cash,
  tileIds,
  playerType
});

const createPlayerState = ({
  players = [],
  currentPlayerId = 0
}): IPlayerState => {
  let result: IPlayerState = {
    currentPlayerId,
    ids: [],
    entities: {}
  };

  return playerAdapter.addMany(players, result);
};

export const PlayerFactory = {
  createPlayer,
  createPlayerState
};

import { IPlayer, PlayerType } from "src/app/models/player";
import { playerAdapter, PlayerState } from "src/app/store/player/player.state";

const createPlayer = ({
  id = 0,
  name = "",
  cash = 0,
  tiles = [],
  playerType = PlayerType.HUMAN
}): IPlayer => ({
  id,
  name,
  cash,
  tiles,
  playerType
});

const createPlayerState = ({
  players = [],
  currentPlayerId = 0
}): PlayerState => {
  let result: PlayerState = {
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

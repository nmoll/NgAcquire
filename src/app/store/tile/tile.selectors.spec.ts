import { AppStateFactory } from "src/app/test/factory/app-state.factory";
import { PlayerFactory } from "src/app/test/factory/player.factory";
import { TileFactory } from "src/app/test/factory/tile.factory";
import { IAppState } from "../app-state";
import { TileSelectors } from "./tile.selectors";

describe("TileSelectors", () => {
  beforeEach(() => {});

  describe("getPlayedTiles", () => {
    let state: IAppState;

    beforeEach(() => {
      state = AppStateFactory.createAppState({
        tileState: TileFactory.createTileState({
          tiles: [
            TileFactory.createTile({ boardSquareId: 1 }),
            TileFactory.createTile({ boardSquareId: 2 }),
            TileFactory.createTile({ boardSquareId: 3 }),
            TileFactory.createTile({ boardSquareId: 4 })
          ],
          playedTileIds: [1, 3]
        })
      });
    });

    it("should return played tiles", () => {
      expect(TileSelectors.getPlayedTiles(state)).toEqual([
        TileFactory.createTile({ boardSquareId: 1 }),
        TileFactory.createTile({ boardSquareId: 3 })
      ]);
    });
  });

  describe("getPlayedTileByBoardSquareId", () => {
    let state: IAppState;

    beforeEach(() => {
      state = AppStateFactory.createAppState({
        tileState: TileFactory.createTileState({
          tiles: [
            TileFactory.createTile({ boardSquareId: 1 }),
            TileFactory.createTile({ boardSquareId: 2 })
          ],
          playedTileIds: [1]
        })
      });
    });

    it("should return tile if played", () => {
      expect(
        TileSelectors.getPlayedTileByBoardSquareId(state, { boardSquareId: 1 })
      ).toEqual(TileFactory.createTile({ boardSquareId: 1 }));
    });

    it("should return undefined if not played", () => {
      expect(
        TileSelectors.getPlayedTileByBoardSquareId(state, { boardSquareId: 2 })
      ).toBeUndefined();
    });
  });

  describe("getAvailableTiles", () => {
    let state: IAppState;

    beforeEach(() => {
      state = AppStateFactory.createAppState({
        tileState: TileFactory.createTileState({
          tiles: [
            TileFactory.createTile({ boardSquareId: 1 }),
            TileFactory.createTile({ boardSquareId: 2 }),
            TileFactory.createTile({ boardSquareId: 3 }),
            TileFactory.createTile({ boardSquareId: 4 })
          ],
          playedTileIds: [4]
        }),
        playerState: PlayerFactory.createPlayerState({
          players: [
            PlayerFactory.createPlayer({
              id: 1,
              tiles: [TileFactory.createTile({ boardSquareId: 1 })]
            }),
            PlayerFactory.createPlayer({
              id: 2,
              tiles: [TileFactory.createTile({ boardSquareId: 3 })]
            })
          ]
        })
      });
    });

    it("should return tiles not played or held by any player", () => {
      expect(TileSelectors.getAvailableTiles(state)).toEqual([
        TileFactory.createTile({ boardSquareId: 2 })
      ]);
    });
  });
});

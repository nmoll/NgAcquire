// describe("TileSelectors", () => {
//   beforeEach(() => {});

//   describe("getPlayedTiles", () => {
//     let state: IAppState;

//     beforeEach(() => {
//       state = AppStateFactory.createAppState({
//         tileState: TileFactory.createTileState({
//           tiles: [
//             TileFactory.createTile({ id: 1 }),
//             TileFactory.createTile({ id: 2 }),
//             TileFactory.createTile({ id: 3 }),
//             TileFactory.createTile({ id: 4 })
//           ],
//           playedTileIds: [1, 3]
//         })
//       });
//     });

//     it("should return played tiles", () => {
//       expect(TileSelectors.getPlayedTiles(state)).toEqual([
//         TileFactory.createTile({ id: 1 }),
//         TileFactory.createTile({ id: 3 })
//       ]);
//     });
//   });

//   describe("getPlayedTileAtPosition", () => {
//     let state: IAppState;

//     beforeEach(() => {
//       state = AppStateFactory.createAppState({
//         tileState: TileFactory.createTileState({
//           tiles: [
//             TileFactory.createTile({ id: 1, positionX: 1, positionY: 1 }),
//             TileFactory.createTile({ id: 2, positionX: 2, positionY: 1 })
//           ],
//           playedTileIds: [1]
//         })
//       });
//     });

//     it("should return tile if played", () => {
//       expect(
//         TileSelectors.getPlayedTileAtPosition(state, {
//           positionX: 1,
//           positionY: 1
//         })
//       ).toEqual(jasmine.objectContaining({ id: 1 }));
//     });

//     it("should return undefined if not played", () => {
//       expect(
//         TileSelectors.getPlayedTileAtPosition(state, {
//           positionX: 2,
//           positionY: 1
//         })
//       ).toBeUndefined();
//     });
//   });

//   describe("getAvailableTileIds", () => {
//     let state: IAppState;

//     beforeEach(() => {
//       state = AppStateFactory.createAppState({
//         tileState: TileFactory.createTileState({
//           tiles: [
//             TileFactory.createTile({ id: 1 }),
//             TileFactory.createTile({ id: 2 }),
//             TileFactory.createTile({ id: 3 }),
//             TileFactory.createTile({ id: 4 })
//           ],
//           playedTileIds: [4]
//         }),
//         playerState: PlayerFactory.createPlayerState({
//           players: [
//             PlayerFactory.createPlayer({
//               id: 1,
//               tiles: [TileFactory.createTile({ id: 1 })]
//             }),
//             PlayerFactory.createPlayer({
//               id: 2,
//               tiles: [TileFactory.createTile({ id: 3 })]
//             })
//           ]
//         })
//       });
//     });

//     it("should return tiles not played or held by any player", () => {
//       expect(TileSelectors.getAvailableTileIds(state)).toEqual([
//         TileFactory.createTile({ id: 2 })
//       ]);
//     });
//   });

//   describe("getAdjacentTilesIdsToLastPlayed", () => {
//     it("should return adjacent tiles", () => {
//       const state = AppStateFactory.createAppState({
//         tileState: TileFactory.createTileState({
//           tiles: TileUtils.createTiles(DefaultBoardConfig),
//           lastPlayedTileId: 2,
//           playedTileIds: [2, 3, 4, 14]
//         })
//       });

//       expect(TileSelectors.getAdjacentTilesIdsToLastPlayed(state)).toEqual([
//         TileSelectors.getPlayedTileAtPosition(state, {
//           positionX: 3,
//           positionY: 1
//         }),
//         TileSelectors.getPlayedTileAtPosition(state, {
//           positionX: 2,
//           positionY: 2
//         })
//       ]);
//     });
//   });
// });

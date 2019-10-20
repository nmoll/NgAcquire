import { BoardSquareStateType } from "../models/board-square-state";
import { HotelChainType } from "../models/hotel-chain";
import { BoardSquareSelectedStateType } from "../models/player-turn";
import { PlayerTurnFactory } from "../test/factory/player-turn.factory";
import { AcquireEngine } from "./acquire-engine";

fdescribe("AcquireEngine", () => {
  describe("computeStateWithTurn", () => {
    describe(BoardSquareStateType.None().type, () => {
      it("should return an empty list if no board state provided", () => {
        expect(AcquireEngine.computeStateWithTurn(null, null)).toEqual([]);
        expect(
          AcquireEngine.computeStateWithTurn(
            null,
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.None()
            })
          )
        ).toEqual([]);
      });
      it("should return the states untouched if no player turns provided", () => {
        const state = [BoardSquareStateType.None()];
        expect(AcquireEngine.computeStateWithTurn(state, null)).toEqual(state);
      });
    });

    describe(BoardSquareStateType.AvailableForSelection().type, () => {
      it("should return 'AvailableForSelection' for each square option and leave the rest untouched", () => {
        expect(
          AcquireEngine.computeStateWithTurn(
            [
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.HasTile()
            ],
            PlayerTurnFactory.createPlayerTurn({
              boardSquareOptionIds: [1],
              boardSquareSelectedState: BoardSquareSelectedStateType.None()
            })
          )
        ).toEqual([
          BoardSquareStateType.None(),
          BoardSquareStateType.AvailableForSelection(),
          BoardSquareStateType.HasTile()
        ]);
      });
    });

    describe(BoardSquareStateType.Selected().type, () => {
      it("should set any states to selected if no selected board square", () => {
        const state = [
          BoardSquareStateType.None(),
          BoardSquareStateType.HasTile(),
          BoardSquareStateType.AvailableForSelection(),
          BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE)
        ];
        expect(
          AcquireEngine.computeStateWithTurn(
            state,
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.None()
            })
          )
        ).toEqual(state);
      });
      it("should return the states untouched if the selected square is outside the state list size", () => {
        const state = [
          BoardSquareStateType.None(),
          BoardSquareStateType.HasTile(),
          BoardSquareStateType.AvailableForSelection(),
          BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE)
        ];
        expect(
          AcquireEngine.computeStateWithTurn(
            state,
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Unconfirmed(
                99
              )
            })
          )
        ).toEqual(state);
      });
      it("should return 'Selected' for the unconfirmed selected square", () => {
        expect(
          AcquireEngine.computeStateWithTurn(
            [
              BoardSquareStateType.None(),
              BoardSquareStateType.HasTile(),
              BoardSquareStateType.AvailableForSelection(),
              BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE)
            ],
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Unconfirmed(
                0
              )
            })
          )
        ).toEqual([
          BoardSquareStateType.Selected(),
          BoardSquareStateType.HasTile(),
          BoardSquareStateType.AvailableForSelection(),
          BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE)
        ]);
      });
    });

    describe(BoardSquareStateType.HasTile().type, () => {
      it("should return 'HasTile' for the confirmed selected square", () => {
        expect(
          AcquireEngine.computeStateWithTurn(
            [
              BoardSquareStateType.None(),
              BoardSquareStateType.AvailableForSelection()
            ],
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                1
              )
            })
          )
        ).toEqual([
          BoardSquareStateType.None(),
          BoardSquareStateType.HasTile()
        ]);
      });
    });

    describe(BoardSquareStateType.PendingHotel().type, () => {
      it("should return 'PendingHotel' if starter tile is played without hotel selection", () => {
        expect(
          AcquireEngine.computeStateWithTurn(
            [
              BoardSquareStateType.None(),
              BoardSquareStateType.HasTile(),
              BoardSquareStateType.None()
            ],
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                2
              ),
              boardSquareOptionIds: []
            })
          )
        ).toEqual([
          BoardSquareStateType.None(),
          BoardSquareStateType.PendingHotel(),
          BoardSquareStateType.PendingHotel()
        ]);

        expect(
          AcquireEngine.computeStateWithTurn(
            [
              BoardSquareStateType.HasTile(),
              BoardSquareStateType.None(),
              BoardSquareStateType.HasTile()
            ],
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                1
              )
            })
          )
        ).toEqual([
          BoardSquareStateType.PendingHotel(),
          BoardSquareStateType.PendingHotel(),
          BoardSquareStateType.PendingHotel()
        ]);

        expect(
          AcquireEngine.computeStateWithTurn(
            [
              // Row 1
              BoardSquareStateType.None(),
              BoardSquareStateType.HasTile(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),

              // Row 2
              BoardSquareStateType.HasTile(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),

              // Row 3
              BoardSquareStateType.None(),
              BoardSquareStateType.HasTile(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.None()
            ],
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                13
              ),
              selectedHotelChain: null
            })
          )
        ).toEqual([
          // Row 1
          BoardSquareStateType.None(),
          BoardSquareStateType.PendingHotel(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),

          // Row 2
          BoardSquareStateType.PendingHotel(),
          BoardSquareStateType.PendingHotel(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),

          // Row 3
          BoardSquareStateType.None(),
          BoardSquareStateType.PendingHotel(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None(),
          BoardSquareStateType.None()
        ]);
      });
    });

    describe("HasHotelChain", () => {
      it("should return 'HasHotelChain' with the hotel chain type that if played next to a hotel chain", () => {
        expect(
          AcquireEngine.computeStateWithTurn(
            [
              BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE),
              BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE),
              BoardSquareStateType.None(),
              BoardSquareStateType.None()
            ],
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                2
              ),
              selectedHotelChain: HotelChainType.WORLDWIDE
            })
          )
        ).toEqual([
          BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE),
          BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE),
          BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE),
          BoardSquareStateType.None()
        ]);
      });

      it("should return 'HasHotelChain' with the hotel chain type if there are pending hotels and a hotel is selected", () => {
        expect(
          AcquireEngine.computeStateWithTurn(
            [
              BoardSquareStateType.PendingHotel(),
              BoardSquareStateType.PendingHotel()
            ],
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                1
              ),
              selectedHotelChain: HotelChainType.WORLDWIDE
            })
          )
        ).toEqual([
          BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE),
          BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE)
        ]);
      });

      it("should return 'HasHotelChain' with the hotel chain type if confirmed tile is placed next to tiles and hotel is selected", () => {
        expect(
          AcquireEngine.computeStateWithTurn(
            [
              BoardSquareStateType.HasTile(),
              BoardSquareStateType.AvailableForSelection(),
              BoardSquareStateType.HasTile()
            ],
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                1
              ),
              selectedHotelChain: HotelChainType.WORLDWIDE
            })
          )
        ).toEqual([
          BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE),
          BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE),
          BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE)
        ]);
      });

      it("should return 'HasHotelChain' with the bigger hotel if merge tile is played", () => {
        expect(
          AcquireEngine.computeStateWithTurn(
            [
              BoardSquareStateType.HasHotelChain(HotelChainType.FESTIVAL),
              BoardSquareStateType.HasHotelChain(HotelChainType.FESTIVAL),
              BoardSquareStateType.AvailableForSelection(),
              BoardSquareStateType.HasHotelChain(HotelChainType.TOWER),
              BoardSquareStateType.HasHotelChain(HotelChainType.TOWER),
              BoardSquareStateType.HasHotelChain(HotelChainType.TOWER)
            ],
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                2
              )
            })
          )
        ).toEqual([
          BoardSquareStateType.HasHotelChain(HotelChainType.TOWER),
          BoardSquareStateType.HasHotelChain(HotelChainType.TOWER),
          BoardSquareStateType.HasHotelChain(HotelChainType.TOWER),
          BoardSquareStateType.HasHotelChain(HotelChainType.TOWER),
          BoardSquareStateType.HasHotelChain(HotelChainType.TOWER),
          BoardSquareStateType.HasHotelChain(HotelChainType.TOWER)
        ]);
      });
    });
  });

  describe("computeStateWithTurns", () => {
    it("should start hotel chain", () => {
      expect(
        AcquireEngine.computeStateWithTurns(
          [
            BoardSquareStateType.None(),
            BoardSquareStateType.None(),
            BoardSquareStateType.None(),
            BoardSquareStateType.None()
          ],
          [
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                1
              )
            }),
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                3
              )
            }),
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                2
              ),
              selectedHotelChain: HotelChainType.AMERICAN
            })
          ]
        )
      ).toEqual([
        BoardSquareStateType.None(),
        BoardSquareStateType.HasHotelChain(HotelChainType.AMERICAN),
        BoardSquareStateType.HasHotelChain(HotelChainType.AMERICAN),
        BoardSquareStateType.HasHotelChain(HotelChainType.AMERICAN)
      ]);
    });

    it("should handle multiple merges", () => {
      expect(
        AcquireEngine.computeStateWithTurns(
          [
            BoardSquareStateType.None(),
            BoardSquareStateType.None(),
            BoardSquareStateType.None(),
            BoardSquareStateType.None(),
            BoardSquareStateType.None(),
            BoardSquareStateType.None(),
            BoardSquareStateType.None(),
            BoardSquareStateType.None(),
            BoardSquareStateType.None()
          ],
          [
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                0
              )
            }),
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                1
              ),
              selectedHotelChain: HotelChainType.AMERICAN
            }),
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                3
              )
            }),
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                4
              ),
              selectedHotelChain: HotelChainType.CONTINENTAL
            }),
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                5
              )
            }),
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                2
              )
            }),
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                8
              )
            }),
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                7
              ),
              selectedHotelChain: HotelChainType.LUXOR
            }),
            PlayerTurnFactory.createPlayerTurn({
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                6
              )
            })
          ]
        )
      ).toEqual([
        BoardSquareStateType.HasHotelChain(HotelChainType.CONTINENTAL),
        BoardSquareStateType.HasHotelChain(HotelChainType.CONTINENTAL),
        BoardSquareStateType.HasHotelChain(HotelChainType.CONTINENTAL),
        BoardSquareStateType.HasHotelChain(HotelChainType.CONTINENTAL),
        BoardSquareStateType.HasHotelChain(HotelChainType.CONTINENTAL),
        BoardSquareStateType.HasHotelChain(HotelChainType.CONTINENTAL),
        BoardSquareStateType.HasHotelChain(HotelChainType.CONTINENTAL),
        BoardSquareStateType.HasHotelChain(HotelChainType.CONTINENTAL),
        BoardSquareStateType.HasHotelChain(HotelChainType.CONTINENTAL)
      ]);
    });
  });
});

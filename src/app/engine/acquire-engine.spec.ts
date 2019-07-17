import { BoardSquareStateType } from "../models/board-square-state";
import { HotelChainType } from "../models/hotel-chain";
import { BoardSquareSelectedStateType } from "../models/player-turn";
import { AcquireEngine } from "./acquire-engine";

fdescribe("AcquireEngine", () => {
  describe("computeNewBoardState", () => {
    describe(BoardSquareStateType.None().type, () => {
      it("should return an empty list if no board state provided", () => {
        expect(AcquireEngine.computeNewBoardState(null, null)).toEqual([]);
        expect(
          AcquireEngine.computeNewBoardState(null, {
            boardSquareOptionIds: [],
            boardSquareSelectedState: BoardSquareSelectedStateType.None()
          })
        ).toEqual([]);
      });
      it("should return the states untouched if no player turns provided", () => {
        const state = [BoardSquareStateType.None()];
        expect(AcquireEngine.computeNewBoardState(state, null)).toEqual(state);
      });
    });

    describe(BoardSquareStateType.AvailableForSelection().type, () => {
      it("should return 'AvailableForSelection' for each square option and leave the rest untouched", () => {
        expect(
          AcquireEngine.computeNewBoardState(
            [
              BoardSquareStateType.None(),
              BoardSquareStateType.None(),
              BoardSquareStateType.HasTile()
            ],
            {
              boardSquareOptionIds: [1],
              boardSquareSelectedState: BoardSquareSelectedStateType.None()
            }
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
          AcquireEngine.computeNewBoardState(state, {
            boardSquareOptionIds: [],
            boardSquareSelectedState: BoardSquareSelectedStateType.None()
          })
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
          AcquireEngine.computeNewBoardState(state, {
            boardSquareOptionIds: [],
            boardSquareSelectedState: BoardSquareSelectedStateType.Unconfirmed(
              99
            )
          })
        ).toEqual(state);
      });
      it("should return 'Selected' for the unconfirmed selected square", () => {
        expect(
          AcquireEngine.computeNewBoardState(
            [
              BoardSquareStateType.None(),
              BoardSquareStateType.HasTile(),
              BoardSquareStateType.AvailableForSelection(),
              BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE)
            ],
            {
              boardSquareOptionIds: [],
              boardSquareSelectedState: BoardSquareSelectedStateType.Unconfirmed(
                0
              )
            }
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
          AcquireEngine.computeNewBoardState(
            [
              BoardSquareStateType.None(),
              BoardSquareStateType.AvailableForSelection()
            ],
            {
              boardSquareOptionIds: [],
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                1
              )
            }
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
          AcquireEngine.computeNewBoardState(
            [
              BoardSquareStateType.None(),
              BoardSquareStateType.HasTile(),
              BoardSquareStateType.None()
            ],
            {
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                2
              ),
              boardSquareOptionIds: [],
              selectedHotelChain: null
            }
          )
        ).toEqual([
          BoardSquareStateType.None(),
          BoardSquareStateType.PendingHotel(),
          BoardSquareStateType.PendingHotel()
        ]);

        expect(
          AcquireEngine.computeNewBoardState(
            [
              BoardSquareStateType.HasTile(),
              BoardSquareStateType.None(),
              BoardSquareStateType.HasTile()
            ],
            {
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                1
              ),
              boardSquareOptionIds: [],
              selectedHotelChain: null
            }
          )
        ).toEqual([
          BoardSquareStateType.PendingHotel(),
          BoardSquareStateType.PendingHotel(),
          BoardSquareStateType.PendingHotel()
        ]);

        expect(
          AcquireEngine.computeNewBoardState(
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
            {
              boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                13
              ),
              boardSquareOptionIds: [],
              selectedHotelChain: null
            }
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

    describe(
      BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE).type +
        " " +
        HotelChainType.WORLDWIDE,
      () => {
        it("should return 'HasHotelChain' with 'Worldwide' if part of Worldwide chain", () => {
          expect(
            AcquireEngine.computeNewBoardState(
              [
                BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE),
                BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE),
                BoardSquareStateType.None(),
                BoardSquareStateType.None()
              ],
              {
                boardSquareOptionIds: [],
                boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                  2
                ),
                selectedHotelChain: HotelChainType.WORLDWIDE
              }
            )
          ).toEqual([
            BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE),
            BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE),
            BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE),
            BoardSquareStateType.None()
          ]);
        });

        it("should return 'HasHotelChain' with 'Worldwide' if there are pending hotels and a hotel is selected", () => {
          expect(
            AcquireEngine.computeNewBoardState(
              [
                BoardSquareStateType.PendingHotel(),
                BoardSquareStateType.PendingHotel()
              ],
              {
                boardSquareOptionIds: [],
                boardSquareSelectedState: BoardSquareSelectedStateType.Confirmed(
                  1
                ),
                selectedHotelChain: HotelChainType.WORLDWIDE
              }
            )
          ).toEqual([
            BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE),
            BoardSquareStateType.HasHotelChain(HotelChainType.WORLDWIDE)
          ]);
        });
      }
    );
  });
});

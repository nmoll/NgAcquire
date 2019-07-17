import { createReducer, on } from "@ngrx/store";
import { HotelChainActions } from "./hotel-chain.actions";
import { hotelChainAdapter, initialState } from "./hotel-chain.state";

export const hotelChainReducer = createReducer(
  initialState,

  on(HotelChainActions.setHotelChains, (state, { hotelChains }) =>
    hotelChainAdapter.addMany(hotelChains, state)
  ),

  on(
    HotelChainActions.starterHotelChainSetTileIds,
    (state, { hotelChain, tileIds }) =>
      hotelChainAdapter.updateOne(
        {
          id: hotelChain.id,
          changes: {
            tileIds
          }
        },
        state
      )
  )
);

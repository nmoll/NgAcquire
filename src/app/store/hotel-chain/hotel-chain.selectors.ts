import { createFeatureSelector, createSelector } from "@ngrx/store";
import { hotelChainAdapter, IHotelChainState } from "./hotel-chain.state";

const getHotelChainState = createFeatureSelector<IHotelChainState>(
  "hotelChainState"
);

const { selectAll } = hotelChainAdapter.getSelectors(getHotelChainState);

const getInactiveHotelChains = createSelector(
  selectAll,
  hotelChains =>
    hotelChains.filter(hotelChain => hotelChain.tileIds.length === 0)
);

export const HotelChainSelectors = {
  getAllHotelChains: selectAll,
  getInactiveHotelChains
};

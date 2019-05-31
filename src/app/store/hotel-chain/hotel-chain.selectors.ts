import { createFeatureSelector } from "@ngrx/store";
import { hotelChainAdapter, HotelChainState } from "./hotel-chain.state";

const getHotelChainState = createFeatureSelector<HotelChainState>(
  "hotelChainState"
);

const { selectAll } = hotelChainAdapter.getSelectors(getHotelChainState);

export const HotelChainSelectors = {
  getAllHotelChains: selectAll
};

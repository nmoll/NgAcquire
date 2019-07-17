import { createAction, props } from "@ngrx/store";
import { IHotelChain } from "src/app/models/hotel-chain";

export const HotelChainActions = {
  setHotelChains: createAction(
    "[Hotel Chain] Set Hotel Chains",
    props<{ hotelChains: IHotelChain[] }>()
  ),

  starterHotelChainSetTileIds: createAction(
    "[Starter Hotel Chain] Set Tile Ids",
    props<{ hotelChain: IHotelChain; tileIds: number[] }>()
  )
};

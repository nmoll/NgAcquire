import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { IHotelChain } from "src/app/models/hotel-chain";

export interface HotelChainState extends EntityState<IHotelChain> {}

export const hotelChainAdapter = createEntityAdapter<IHotelChain>();

export const initialState: HotelChainState = hotelChainAdapter.getInitialState();

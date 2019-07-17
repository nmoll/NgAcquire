import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { IHotelChain } from "src/app/models/hotel-chain";

export interface IHotelChainState extends EntityState<IHotelChain> {}

export const hotelChainAdapter = createEntityAdapter<IHotelChain>();

export const initialState: IHotelChainState = hotelChainAdapter.getInitialState();

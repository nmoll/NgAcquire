import { HotelChainType, IHotelChain } from "../models/hotel-chain";

const createHotelChains = (): IHotelChain[] => {
  return [
    {
      id: 1,
      name: "Worldwide",
      type: HotelChainType.WORLDWIDE
    },
    {
      id: 2,
      name: "Luxor",
      type: HotelChainType.LUXOR
    },
    {
      id: 3,
      name: "Festival",
      type: HotelChainType.FESTIVAL
    },
    {
      id: 4,
      name: "Imperial",
      type: HotelChainType.IMPERIAL
    },
    {
      id: 5,
      name: "American",
      type: HotelChainType.AMERICAN
    },
    {
      id: 6,
      name: "Continental",
      type: HotelChainType.CONTINENTAL
    },
    {
      id: 7,
      name: "Tower",
      type: HotelChainType.TOWER
    }
  ];
};

export const HotelChainUtils = {
  createHotelChains
};

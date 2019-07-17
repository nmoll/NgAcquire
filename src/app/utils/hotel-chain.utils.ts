import { HotelChainType, IHotelChain } from "../models/hotel-chain";

const createHotelChains = (): IHotelChain[] => {
  return [
    {
      id: 1,
      name: "Worldwide",
      type: HotelChainType.WORLDWIDE,
      tileIds: []
    },
    {
      id: 2,
      name: "Luxor",
      type: HotelChainType.LUXOR,
      tileIds: []
    },
    {
      id: 3,
      name: "Festival",
      type: HotelChainType.FESTIVAL,
      tileIds: []
    },
    {
      id: 4,
      name: "Imperial",
      type: HotelChainType.IMPERIAL,
      tileIds: []
    },
    {
      id: 5,
      name: "American",
      type: HotelChainType.AMERICAN,
      tileIds: []
    },
    {
      id: 6,
      name: "Continental",
      type: HotelChainType.CONTINENTAL,
      tileIds: []
    },
    {
      id: 7,
      name: "Tower",
      type: HotelChainType.TOWER,
      tileIds: []
    }
  ];
};

export const HotelChainUtils = {
  createHotelChains
};

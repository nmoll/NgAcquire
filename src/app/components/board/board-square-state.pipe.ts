import { Pipe, PipeTransform } from "@angular/core";
import { BoardSquareState } from "src/app/models/board-square-state";
import { HotelChainType } from "src/app/models/hotel-chain";

@Pipe({
  name: "boardSquareState"
})
export class BoardSquareStatePipe implements PipeTransform {
  transform(state: BoardSquareState): string {
    switch (state.type) {
      case "None":
        return "border-gray-700 text-gray-600";
      case "AvailableForSelection":
        return "border-green-300";
      case "Selected":
        return "bg-green-300 text-gray-900";
      case "HasTile":
        return "text-gray-900 border-gray-500 bg-gray-500";
      case "HasHotelChain":
        switch (state.hotelChainType) {
          case HotelChainType.WORLDWIDE:
            return "bg-red-300 border-red-300";
          case HotelChainType.LUXOR:
            return "bg-red-700 border-red-700";
          case HotelChainType.FESTIVAL:
            return "bg-green-700 border-green-700";
          case HotelChainType.IMPERIAL:
            return "bg-pink-500 border-pink-500";
          case HotelChainType.AMERICAN:
            return "bg-blue-700 border-blue-700";
          case HotelChainType.CONTINENTAL:
            return "bg-blue-300 border-blue-300";
          case HotelChainType.TOWER:
            return "bg-yellow-500 border-yellow-500";
        }
    }
  }
}

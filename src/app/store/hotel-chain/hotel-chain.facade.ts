import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IHotelChain } from "src/app/models/hotel-chain";
import { HotelChainUtils } from "src/app/utils/hotel-chain.utils";
import { HotelChainActions } from "./hotel-chain.actions";
import { HotelChainSelectors } from "./hotel-chain.selectors";
import { HotelChainState } from "./hotel-chain.state";

@Injectable({
  providedIn: "root"
})
export class HotelChainFacade {
  public hotelChains$: Observable<IHotelChain[]>;

  constructor(private store: Store<HotelChainState>) {
    this.hotelChains$ = this.store.pipe(
      select(HotelChainSelectors.getAllHotelChains)
    );
  }

  public loadHotelChains(): void {
    this.store.dispatch(
      HotelChainActions.setHotelChains({
        hotelChains: HotelChainUtils.createHotelChains()
      })
    );
  }
}

import { TestBed } from "@angular/core/testing";
import { TileBagService } from "./tile-bag.service";

describe("TileService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: TileBagService = TestBed.get(TileBagService);
    expect(service).toBeTruthy();
  });
});

import { Collection } from "@iiif/presentation-3";

export type HydroponicConfig = {};

export class Hydroponic {
  private readonly config: HydroponicConfig;

  constructor(config: Partial<HydroponicConfig>) {
    this.config = Object.assign({});
  }

  grow() {
    console.log(`grow`);
    return;
  }
}

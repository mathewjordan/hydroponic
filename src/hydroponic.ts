import { Collection } from "@iiif/presentation-3";

export type HydroponicConfig = {
  items: string[];
};

export class Hydroponic {
  private readonly config: HydroponicConfig;

  constructor(config: Partial<HydroponicConfig>) {
    this.config = Object.assign({});
  }

  getId() {
    return "";
  }

  getLabel() {
    return { none: [""] };
  }

  loadItems() {
    return [];
  }

  grow() {
    const strain: Collection = {
      id: this.getId(),
      type: "Collection",
      label: this.getLabel(),
      items: this.loadItems(),
    };
    return strain;
  }
}

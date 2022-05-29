import { Collection, InternationalString } from "@iiif/presentation-3";

export type HydroponicInstance = {
  id: string;
  label: InternationalString;
  summary?: InternationalString;
  homepageId?: string;
};

export type HydroponicItem = {
  id: string;
  homepageId?: string;
};

export interface HydroponicConfig {
  instance: HydroponicInstance;
  items: HydroponicItem[];
}

export class Hydroponic {
  private readonly config: HydroponicConfig;

  constructor(config: Partial<HydroponicConfig>) {
    this.config = Object.assign({});
  }

  defaultFetcher = (url: string) => {
    return fetch(url).then((r) => r.json());
  };

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
    console.log(this.config);
    const strain: Collection = {
      id: this.getId(),
      type: "Collection",
      label: this.getLabel(),
      items: this.loadItems(),
    };
    return strain;
  }
}

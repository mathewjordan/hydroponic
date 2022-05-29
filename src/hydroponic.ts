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

export type HydroponicConfig = {};

export interface HydroponicGrow {
  instance: HydroponicInstance;
  items: HydroponicItem[];
}

export class Hydroponic {
  constructor(config: Partial<HydroponicConfig>) {}

  fetcher = (url: string) => {
    return fetch(url).then((r) => r.json());
  };

  loadItems(items: HydroponicItem[]) {
    return items.map((item) => {
      const data = this.fetcher(item.id);
      console.log(data);
      return {
        id: item.id,
        type: "Manifest",
        label: { none: ["Smokies"] },
      };
    });
  }

  grow(instance: HydroponicInstance, items: HydroponicItem[]) {
    const { id, label, summary, homepageId } = instance;
    const strain = {
      id: id,
      type: "Collection",
      label: label,
      items: this.loadItems(items),
    };
    return strain;
  }
}

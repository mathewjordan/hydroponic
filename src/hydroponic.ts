import {
  CollectionNormalized,
  InternationalString,
  ManifestNormalized,
} from "@iiif/presentation-3";
import { convertPresentation2 } from "@iiif/parser/presentation-2";
import { useEffect, useState } from "react";

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

  vaultFetcher = (url: string) => {
    const [data, setData] = useState<
      ManifestNormalized | CollectionNormalized | undefined
    >();

    useEffect(() => {
      fetch(url).then((response) =>
        response.json().then((response) => {
          let json = response;
          if (
            json["@context"] ===
            "http://iiif.io/api/presentation/2/context.json"
          )
            json = convertPresentation2(json);

          setData(json);
        })
      );
    }, []);

    if (data && data.id) return data;
  };

  loadItem(item: HydroponicItem, homepageId: string | undefined) {
    const data = this.vaultFetcher(item.id);

    if (data) {
      const { id, type, label, thumbnail, homepage } = data;
      const entry = { id, type, label, thumbnail, homepage };

      if (!thumbnail) {
        const body = data.items[0].items[0].items[0].body;
        delete body.label;
        entry.thumbnail = [body];
      }

      if (homepageId) {
        entry.homepage = [
          {
            id: homepageId,
            type: "Text",
            label,
            format: "text/html",
          },
        ];
      }

      return entry;
    }
  }

  grow(instance: HydroponicInstance, items: HydroponicItem[]) {
    const { id, label, summary, homepage } = instance;
    return {
      id: id,
      type: "Collection",
      label: label,
      summary: summary,
      items: items
        .map((item) => this.loadItem(item, homepageId))
        .filter((item) => item),
    };
  }
}

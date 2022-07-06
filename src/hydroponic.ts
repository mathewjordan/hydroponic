import {
  Annotation,
  AnnotationBody,
  AnnotationPage,
  Canvas,
  Collection,
  Manifest,
} from "@iiif/presentation-3";
import {
  HydroponicInstance,
  HydroponicItem,
  HydroponicResource,
} from "./types/hydroponic";
import { useEffect, useState } from "react";
import { convertPresentation2 } from "@iiif/parser/presentation-2";
export class Hydroponic {
  vaultFetcher = (url: string) => {
    const [data, setData] = useState<Manifest | Collection | undefined>();

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

  loadItem(item: HydroponicItem) {
    const data = this.vaultFetcher(item.id);

    if (data) {
      const { id, type, label, thumbnail, homepage } = data;
      const entry = { id, type, label, thumbnail, homepage };

      if (!thumbnail) {
        let canvas;
        let annotationPage;
        let annotation;
        let body;

        canvas = data?.items[0] as Canvas;

        if (canvas && canvas.items)
          annotationPage = canvas.items[0] as AnnotationPage;
        if (annotationPage && annotationPage.items)
          annotation = annotationPage.items[0] as Annotation;
        if (annotation && annotation.body)
          body = annotation.body as AnnotationBody as HydroponicResource;

        if (body) {
          const thumbnailEntry = {
            ...body,
          };

          delete thumbnailEntry.label;
          entry.thumbnail = [thumbnailEntry];
        }
      }

      if (item?.href) {
        const homepage = {
          id: item.href,
          type: "Text",
          label,
          format: "text/html",
        } as HydroponicResource;
        entry.homepage = [homepage];
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
      homepage: homepage,
      items: items.map((item) => this.loadItem(item)).filter((item) => item),
    };
  }
}

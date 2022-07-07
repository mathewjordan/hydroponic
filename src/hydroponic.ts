import {
  Annotation,
  AnnotationBody,
  AnnotationPage,
  Canvas,
  // Collection,
  // Manifest,
} from "@iiif/presentation-3";
import {
  HydroponicConfig,
  HydroponicInstance,
  HydroponicItem,
  HydroponicResource,
} from "./types/hydroponic";
// import { useEffect, useState } from "react";
// import { convertPresentation2 } from "@iiif/parser/presentation-2";

export default class Hydroponic {
  constructor(config: Partial<HydroponicConfig>) {
    console.log(config);
  }

  // fetcher = (url: string) => {
  //   const [data, setData] = useState<Manifest | Collection | undefined>();

  //   useEffect(() => {
  //     fetch(url).then((response) =>
  //       response.json().then((response) => {
  //         let json = response;
  //         if (
  //           json["@context"] ===
  //           "http://iiif.io/api/presentation/2/context.json"
  //         )
  //           json = convertPresentation2(json);

  //         setData(json);
  //       })
  //     );
  //   }, []);

  //   if (data && data.id) return data;
  // };

  loadItem(item: HydroponicItem) {
    // const data = this.fetcher(item.id);
    const data = {
      "@context": "http://iiif.io/api/presentation/3/context.json",
      id: "https://iiif.stack.rdc.library.northwestern.edu/public/9b/b0/6e/56/-c/85/8-/4c/b8/-8/08/b-/a3/16/53/97/ef/c4-manifest.json",
      type: "Manifest",
      label: {
        none: [
          "Avalokiteshvara with Eleven Faces and One Thousand Hands. Detail: upper left",
        ],
      },
      items: [
        {
          id: "https://iiif.stack.rdc.library.northwestern.edu/public/9b/b0/6e/56/-c/85/8-/4c/b8/-8/08/b-/a3/16/53/97/ef/c4-manifest.json/canvas/40fb7057-fe04-40d9-b828-be4b49e88447",
          type: "Canvas",
          height: "480",
          width: "640",
          label: {
            none: ["inu-dil-13dd992d-d22a-4471-8cf1-4d4f22e8aee4.tif"],
          },
          items: [
            {
              id: "https://iiif.stack.rdc.library.northwestern.edu/public/9b/b0/6e/56/-c/85/8-/4c/b8/-8/08/b-/a3/16/53/97/ef/c4-manifest.json/canvas/40fb7057-fe04-40d9-b828-be4b49e88447/annotation-page",
              type: "AnnotationPage",
              items: [
                {
                  id: "http://example.org/oa:Annotation/4",
                  type: "Annotation",
                  motivation: "painting",
                  target:
                    "https://iiif.stack.rdc.library.northwestern.edu/public/9b/b0/6e/56/-c/85/8-/4c/b8/-8/08/b-/a3/16/53/97/ef/c4-manifest.json/canvas/40fb7057-fe04-40d9-b828-be4b49e88447",
                  body: {
                    id: "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/40fb7057-fe04-40d9-b828-be4b49e88447/full/600,/0/default.jpg",
                    type: "Image",
                    label: {
                      none: [
                        "inu-dil-13dd992d-d22a-4471-8cf1-4d4f22e8aee4.tif",
                      ],
                    },
                    service: [
                      {
                        "@id":
                          "https://iiif.stack.rdc.library.northwestern.edu/iiif/2/40fb7057-fe04-40d9-b828-be4b49e88447",
                        "@type": "ImageService2",
                        profile: "level2",
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    };

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

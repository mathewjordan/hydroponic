import React from "react";
import ReactDOM from "react-dom";
import { Hydroponic } from "./index";
import { Collection } from "@iiif/presentation-3";
import Bloom from "@samvera/bloom-iiif";

const instance = {
  id: "http://127.0.0.1:8080/output/mixed-source.json",
  label: { none: ["Sample"] },
  summary: { none: ["Sample"] },
  homepage: [
    {
      id: "https://foo.bar/baz",
      type: "Text",
      label: { none: "Sample" },
      format: "text/html",
    },
  ],
};

const items = [
  {
    id: "https://iiif.stack.rdc.library.northwestern.edu/public/7e/56/09/dc/-a/b7/1-/49/8a/-8/69/3-/19/6e/a3/8c/8b/ca-manifest.json",
    href: "https://foo.bar/baz/qux",
  },
  {
    id: "https://iiif.stack.rdc.library.northwestern.edu/public/b5/2d/5d/93/-a/11/7-/43/e9/-9/0c/7-/43/4f/a1/21/2b/60-manifest.json",
    href: "https://foo.bar/baz/qux",
  },
  {
    id: "https://iiif.stack.rdc.library.northwestern.edu/public/16/66/86/99/-7/0a/8-/48/8a/-9/63/3-/12/27/d7/86/f7/13-manifest.json",
    href: "https://foo.bar/baz/qux",
  },
  {
    id: "https://iiif.stack.rdc.library.northwestern.edu/public/f3/4e/ec/84/-2/37/1-/45/a3/-b/85/7-/bd/f1/95/93/3e/4f-manifest.json",
    href: "https://foo.bar/baz/qux",
  },
  {
    id: "https://iiif.stack.rdc.library.northwestern.edu/public/df/9a/96/dc/-7/66/d-/4b/a5/-b/f9/1-/fe/29/4e/1e/05/cb-manifest.json",
    href: "https://foo.bar/baz/qux",
  },
  {
    id: "https://iiif.stack.rdc.library.northwestern.edu/public/47/d2/76/f6/-f/a2/2-/49/91/-9/bf/3-/98/b3/f6/8f/0b/c5-manifest.json",
    href: "https://foo.bar/baz/qux",
  },
];

const Wrapper: React.FC = () => {
  const hydroponic = new Hydroponic();
  const collection = hydroponic.grow(instance, items) as Collection;
  return (
    <>
      <Bloom collectionId="http://127.0.0.1:8080/output/mixed-source.json" />
      <textarea
        disabled
        style={{ width: "100%", height: "50vh" }}
        value={JSON.stringify(collection)}
      />
    </>
  );
};

ReactDOM.render(<Wrapper />, document.getElementById("root"));

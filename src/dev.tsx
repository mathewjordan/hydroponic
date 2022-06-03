import React from "react";
import ReactDOM from "react-dom";
import { Hydroponic } from "./index";
import { Collection } from "@iiif/presentation-3";
import Bloom from "@samvera/bloom-iiif";

const instance = {
  id: "http://127.0.0.1:8080/fixtures/collection/output.json",
  label: { none: "Smokies" },
  summary: { none: "Smokies" },
  homepage: [
    {
      id: "https://foo.bar/baz",
      type: "Text",
      label: { none: "Smokies" },
      format: "text/html",
    },
  ],
};

const items = [
  {
    id: "https://iiif.stack.rdc.library.northwestern.edu/public/49/a5/48/bb/-9/4e/7-/49/2e/-b/45/9-/65/21/9c/e4/79/dc-manifest.json",
  },
  { id: "https://digital.lib.utk.edu/assemble/manifest/pcard00/100233" },
  { id: "https://digital.lib.utk.edu/assemble/manifest/pcard00/100283" },
  { id: "https://digital.lib.utk.edu/assemble/manifest/pcard00/100263" },
  { id: "https://digital.lib.utk.edu/assemble/manifest/pcard00/100253" },
  { id: "https://digital.lib.utk.edu/assemble/manifest/pcard00/100243" },
  { id: "https://digital.lib.utk.edu/assemble/manifest/pcard00/100273" },
  { id: "https://digital.lib.utk.edu/assemble/manifest/pcard00/100213" },
];

const Wrapper: React.FC = () => {
  const hydroponic = new Hydroponic();
  const collection = hydroponic.grow(instance, items) as Collection;
  return <>{JSON.stringify(collection)}</>;
};

ReactDOM.render(<Wrapper />, document.getElementById("root"));

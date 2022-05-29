import React, { StrictMode } from "react";
import { Hydroponic } from "./index";
import { createRoot } from "react-dom/client";
import { Collection } from "@iiif/presentation-3";

const instance = {
  id: "https://smokies.bar/baz",
  label: { none: "Smokies" },
};

const items = [
  { id: "https://digital.lib.utk.edu/assemble/manifest/pcard00/100233" },
  { id: "https://digital.lib.utk.edu/assemble/manifest/pcard00/100263" },
];

const Wrapper = () => {
  const hydroponic = new Hydroponic();
  const collection = hydroponic.grow(instance, items) as Collection;
  console.log(collection);
  return <></>;
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Wrapper />
  </StrictMode>
);

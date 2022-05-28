import React, { StrictMode } from "react";
import { Hydroponic } from "./index";
import { createRoot } from "react-dom/client";
import { Collection } from "@iiif/presentation-3";

const Wrapper = () => {
  const hydroponic = new Hydroponic();
  const collection = hydroponic.grow() as Collection;
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

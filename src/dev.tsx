import React, { StrictMode } from "react";
import Hydroponic from "./index";
import { createRoot } from "react-dom/client";

const Wrapper = () => {
  const collection = new Hydroponic();
  collection.grow();
  return <></>;
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Wrapper />
  </StrictMode>
);

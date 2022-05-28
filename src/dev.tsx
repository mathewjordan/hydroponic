import React, { StrictMode } from "react";
import grow from "./index";
import { createRoot } from "react-dom/client";

const Wrapper = () => {
  grow();
  return <>grow</>;
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Wrapper />
  </StrictMode>
);

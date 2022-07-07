import React from "react";
import ReactDOM from "react-dom";
import Hydroponic from "./index";
import { Collection } from "@iiif/presentation-3";
import Bloom from "@samvera/bloom-iiif";
import { instance, items } from "../seeds/tankas-voyager-linrothe";

const Wrapper: React.FC = () => {
  /**
   * Instantiate Hydroponic and grow the instance.
   */
  const hydroponic = new Hydroponic({});
  const collection = hydroponic.grow(instance, items) as Collection;

  return (
    <>
      <Bloom collectionId="http://127.0.0.1:8080/output/tankas-voyager-linrothe.json" />
      <textarea
        disabled
        style={{ width: "100%", height: "50vh" }}
        value={JSON.stringify(collection)}
      />
    </>
  );
};

ReactDOM.render(<Wrapper />, document.getElementById("root"));

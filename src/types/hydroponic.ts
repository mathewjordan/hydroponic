import { ExternalWebResource, InternationalString } from "@iiif/presentation-3";

export type HydroponicInstance = {
  id: string;
  label: InternationalString;
  summary?: InternationalString;
  homepage?: any;
};

export type HydroponicItem = {
  id: string;
  href?: string;
};

export interface HydroponicResource extends ExternalWebResource {
  label?: InternationalString;
}

export type HydroponicConfig = {
  instance: HydroponicInstance;
  items: HydroponicItem[];
};

export interface HydroponicGrow {
  instance: HydroponicInstance;
  items: HydroponicItem[];
}

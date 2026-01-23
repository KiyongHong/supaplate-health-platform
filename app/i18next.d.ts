import "i18next";
import type { Translation } from "./locales/types";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: Translation;
    };
  }
}

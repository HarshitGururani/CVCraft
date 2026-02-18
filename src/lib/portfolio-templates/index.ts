/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TemplateDefinition {
  getHTML: (userData: any) => string;
  getCSS: () => string;
  getJS: () => string;
}

import { brutalistTemplate } from "./brutalist";
import { eliteNarrativeTemplate } from "./elite-narrative";
import { terminalTemplate } from "./terminal";
import { minimalSuperiorTemplate } from "./minimal";
import { magazineTemplate } from "./magazine";
import { maverickTemplate } from "./maverick";

export const portfolioTemplates: Record<string, TemplateDefinition> = {
  brutalist: brutalistTemplate,
  "elite-narrative": eliteNarrativeTemplate,
  terminal: terminalTemplate,
  minimal: minimalSuperiorTemplate,
  magazine: magazineTemplate,
  maverick: maverickTemplate,
};

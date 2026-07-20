export interface LegalMetadata {
  type: "metadata";
  title: string;
  lastUpdated: string;
}

export interface LegalController {
  name: string;
  organization: string;
  contact: string;
}

export interface LegalSubsection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  note?: string;
}

export interface LegalSection {
  type: "section";
  number: number;
  heading: string;

  intro?: string;

  paragraphs?: string[];

  bullets?: string[];

  note?: string;

  controller?: LegalController;

  paragraphsAfterController?: string[];

  paragraphsAfterBullets?: string[];

  subsections?: LegalSubsection[];
}

export type LegalDataItem = LegalMetadata | LegalSection;

export type LegalData = LegalDataItem[];

export interface FontDef {
  family: string;
  label: string;
  src?: string;
}

export const FONTS: FontDef[] = [
  { family: "Helvetica",   label: "Helvetica"   },
  { family: "Times-Roman", label: "Times Roman" },
  { family: "Courier",     label: "Courier"     },
];

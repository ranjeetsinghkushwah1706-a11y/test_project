export type FieldType = "text" | "date" | "signature" | "checkbox";

export interface Position {
  x: number; // Percentage (0-100)
  y: number; // Percentage (0-100)
}

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  position: Position;
  value?: string | boolean;
}

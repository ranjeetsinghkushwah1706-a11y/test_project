import { Field } from "./Field";

export interface Blueprint {
  id: string;
  name: string;
  fields: Field[];
  createdAt: string;
}

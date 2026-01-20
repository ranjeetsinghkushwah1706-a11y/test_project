import { Field } from "./Field";

export type ContractStatus = 
  | "CREATED" 
  | "APPROVED" 
  | "SENT" 
  | "SIGNED" 
  | "LOCKED" 
  | "REVOKED";

export interface Contract {
  id: string;
  name: string;
  blueprintId: string;
  fields: Field[];
  status: ContractStatus;
  createdAt: string;
}

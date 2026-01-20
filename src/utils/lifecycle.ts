import { ContractStatus } from "../models/Contract";

/**
 * Defines valid state transitions for contract lifecycle
 * Each status maps to an array of valid next statuses
 */
export const LIFECYCLE_TRANSITIONS: Record<ContractStatus, ContractStatus[]> = {
  CREATED: ["APPROVED", "REVOKED"],
  APPROVED: ["SENT"],
  SENT: ["SIGNED", "REVOKED"],
  SIGNED: ["LOCKED"],
  LOCKED: [],
  REVOKED: [],
};

/**
 * Checks if a transition from currentStatus to newStatus is valid
 */
export const isValidTransition = (
  currentStatus: ContractStatus,
  newStatus: ContractStatus
): boolean => {
  return LIFECYCLE_TRANSITIONS[currentStatus].includes(newStatus);
};

/**
 * Gets all valid next statuses for a given current status
 */
export const getValidNextStatuses = (
  currentStatus: ContractStatus
): ContractStatus[] => {
  return LIFECYCLE_TRANSITIONS[currentStatus];
};

/**
 * Checks if a contract can be edited
 * Locked and revoked contracts cannot be edited
 */
export const canEditContract = (status: ContractStatus): boolean => {
  return status !== "LOCKED" && status !== "REVOKED";
};

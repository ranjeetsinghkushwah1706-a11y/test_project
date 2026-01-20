import { Blueprint } from "../models/Blueprint";
import { Contract } from "../models/Contract";

const BLUEPRINTS_KEY = "contract_management_blueprints";
const CONTRACTS_KEY = "contract_management_contracts";

/**
 * Blueprint storage operations
 */
export const blueprintStorage = {
  getAll: (): Blueprint[] => {
    try {
      const data = localStorage.getItem(BLUEPRINTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  save: (blueprint: Blueprint): void => {
    const blueprints = blueprintStorage.getAll();
    const existingIndex = blueprints.findIndex((b) => b.id === blueprint.id);
    
    if (existingIndex >= 0) {
      blueprints[existingIndex] = blueprint;
    } else {
      blueprints.push(blueprint);
    }
    
    localStorage.setItem(BLUEPRINTS_KEY, JSON.stringify(blueprints));
  },

  delete: (id: string): void => {
    const blueprints = blueprintStorage.getAll();
    const filtered = blueprints.filter((b) => b.id !== id);
    localStorage.setItem(BLUEPRINTS_KEY, JSON.stringify(filtered));
  },
};

/**
 * Contract storage operations
 */
export const contractStorage = {
  getAll: (): Contract[] => {
    try {
      const data = localStorage.getItem(CONTRACTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  save: (contract: Contract): void => {
    const contracts = contractStorage.getAll();
    const existingIndex = contracts.findIndex((c) => c.id === contract.id);
    
    if (existingIndex >= 0) {
      contracts[existingIndex] = contract;
    } else {
      contracts.push(contract);
    }
    
    localStorage.setItem(CONTRACTS_KEY, JSON.stringify(contracts));
  },

  delete: (id: string): void => {
    const contracts = contractStorage.getAll();
    const filtered = contracts.filter((c) => c.id !== id);
    localStorage.setItem(CONTRACTS_KEY, JSON.stringify(filtered));
  },
};

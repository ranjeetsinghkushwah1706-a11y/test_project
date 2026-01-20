import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Contract, ContractStatus } from "../models/Contract";
import { contractStorage } from "../utils/storage";
import { isValidTransition } from "../utils/lifecycle";

interface ContractContextType {
  contracts: Contract[];
  addContract: (contract: Contract) => void;
  updateContract: (contract: Contract) => void;
  updateContractStatus: (id: string, newStatus: ContractStatus) => boolean;
  deleteContract: (id: string) => void;
  getContract: (id: string) => Contract | undefined;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  // Load contracts from localStorage on mount
  useEffect(() => {
    const loaded = contractStorage.getAll();
    setContracts(loaded);
  }, []);

  const addContract = (contract: Contract) => {
    contractStorage.save(contract);
    setContracts((prev) => [...prev, contract]);
  };

  const updateContract = (contract: Contract) => {
    contractStorage.save(contract);
    setContracts((prev) =>
      prev.map((c) => (c.id === contract.id ? contract : c))
    );
  };

  const updateContractStatus = (id: string, newStatus: ContractStatus): boolean => {
    const contract = contracts.find((c) => c.id === id);
    if (!contract) return false;

    if (!isValidTransition(contract.status, newStatus)) {
      return false;
    }

    const updated = { ...contract, status: newStatus };
    contractStorage.save(updated);
    setContracts((prev) =>
      prev.map((c) => (c.id === id ? updated : c))
    );
    return true;
  };

  const deleteContract = (id: string) => {
    contractStorage.delete(id);
    setContracts((prev) => prev.filter((c) => c.id !== id));
  };

  const getContract = (id: string) => {
    return contracts.find((c) => c.id === id);
  };

  return (
    <ContractContext.Provider
      value={{
        contracts,
        addContract,
        updateContract,
        updateContractStatus,
        deleteContract,
        getContract,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContracts = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("useContracts must be used within ContractProvider");
  }
  return context;
};

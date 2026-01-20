import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Blueprint } from "../models/Blueprint";
import { blueprintStorage } from "../utils/storage";

interface BlueprintContextType {
  blueprints: Blueprint[];
  addBlueprint: (blueprint: Blueprint) => void;
  updateBlueprint: (blueprint: Blueprint) => void;
  deleteBlueprint: (id: string) => void;
  getBlueprint: (id: string) => Blueprint | undefined;
}

const BlueprintContext = createContext<BlueprintContextType | undefined>(undefined);

export const BlueprintProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blueprints, setBlueprints] = useState<Blueprint[]>([]);

  // Load blueprints from localStorage on mount
  useEffect(() => {
    const loaded = blueprintStorage.getAll();
    setBlueprints(loaded);
  }, []);

  const addBlueprint = (blueprint: Blueprint) => {
    blueprintStorage.save(blueprint);
    setBlueprints((prev) => [...prev, blueprint]);
  };

  const updateBlueprint = (blueprint: Blueprint) => {
    blueprintStorage.save(blueprint);
    setBlueprints((prev) =>
      prev.map((b) => (b.id === blueprint.id ? blueprint : b))
    );
  };

  const deleteBlueprint = (id: string) => {
    blueprintStorage.delete(id);
    setBlueprints((prev) => prev.filter((b) => b.id !== id));
  };

  const getBlueprint = (id: string) => {
    return blueprints.find((b) => b.id === id);
  };

  return (
    <BlueprintContext.Provider
      value={{
        blueprints,
        addBlueprint,
        updateBlueprint,
        deleteBlueprint,
        getBlueprint,
      }}
    >
      {children}
    </BlueprintContext.Provider>
  );
};

export const useBlueprints = () => {
  const context = useContext(BlueprintContext);
  if (!context) {
    throw new Error("useBlueprints must be used within BlueprintProvider");
  }
  return context;
};

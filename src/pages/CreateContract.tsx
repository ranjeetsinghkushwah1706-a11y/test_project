import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlueprints } from "../context/BlueprintContext";
import { useContracts } from "../context/ContractContext";
import { Contract } from "../models/Contract";
import { Field } from "../models/Field";
import { ContractForm } from "../components/Contract/ContractForm";
import { Button } from "../components/Common/Button";
import { Layout } from "../components/Common/Layout";
import { BottomNavigation } from "../components/Common/BottomNavigation";

export const CreateContract: React.FC = () => {
  const navigate = useNavigate();
  const { blueprints } = useBlueprints();
  const { addContract } = useContracts();
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>("");
  const [contract, setContract] = useState<Contract | null>(null);
  const [contractName, setContractName] = useState("");
  const [step, setStep] = useState(1);

  const selectedBlueprint = blueprints.find((b) => b.id === selectedBlueprintId);

  const handleBlueprintSelect = () => {
    if (!selectedBlueprintId) {
      alert("Please select a blueprint");
      return;
    }

    const blueprint = blueprints.find((b) => b.id === selectedBlueprintId);
    if (!blueprint) {
      alert("Blueprint not found");
      return;
    }

    // Create contract from blueprint
    const newContract: Contract = {
      id: Date.now().toString(),
      name: contractName || `${blueprint.name} - Contract`,
      blueprintId: blueprint.id,
      fields: blueprint.fields.map((field: Field) => ({
        ...field,
        value: field.type === "checkbox" ? false : undefined,
      })),
      status: "CREATED",
      createdAt: new Date().toISOString(),
    };

    setContract(newContract);
    setStep(2);
  };

  const handleSave = (updatedContract: Contract) => {
    addContract(updatedContract);
    navigate(`/contracts/${updatedContract.id}`);
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSaveDraft = () => {
    if (!contract) return;
    addContract(contract);
    navigate("/");
  };

  // Step 2: Contract Details
  if (step === 2 && contract) {
    return (
      <Layout>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setStep(1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              ←
            </button>
            <h2 className="text-xl font-bold text-gray-900">New Contract</h2>
            <div className="flex-1"></div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              ⋯
            </button>
          </div>

          {/* Step Indicator */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase">
                Step 2 of 2
              </span>
            </div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-4">
              Contract Details
            </div>
          </div>

          {/* Contract Form */}
          <ContractForm
            contract={contract}
            onSave={handleSave}
            onCancel={handleCancel}
          />

          {/* Footer Actions */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
            <div className="max-w-7xl mx-auto flex gap-3">
              <Button
                variant="secondary"
                onClick={handleSaveDraft}
                className="flex-1"
              >
                Save Draft
              </Button>
              <Button
                onClick={() => {
                  const updatedContract: Contract = {
                    ...contract,
                    name: contractName || contract.name,
                  };
                  handleSave(updatedContract);
                }}
                className="flex-1 flex items-center justify-center gap-2"
              >
                Create Contract
                <span>→</span>
              </Button>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </Layout>
    );
  }

  // Step 1: Select Blueprint
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            ←
          </button>
          <h2 className="text-xl font-bold text-gray-900">New Contract</h2>
          <div className="flex-1"></div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            ⋯
          </button>
        </div>

        {/* Step 1: Select Blueprint */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-gray-500 uppercase mb-4">
            Step 1: Select Blueprint
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Template Selection
            </label>
            <select
              value={selectedBlueprintId}
              onChange={(e) => setSelectedBlueprintId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="">Choose a template...</option>
              {blueprints.map((blueprint) => (
                <option key={blueprint.id} value={blueprint.id}>
                  {blueprint.name}
                </option>
              ))}
            </select>

            {blueprints.length === 0 && (
              <p className="text-sm text-gray-500 mt-4">
                No blueprints available. Please create a blueprint first.
              </p>
            )}
          </div>

          {/* Selected Blueprint Display */}
          {selectedBlueprint && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-2xl">ℹ️</div>
                <div className="flex-1">
                  <h3 className="font-bold text-blue-900 mb-2">
                    {selectedBlueprint.name}
                  </h3>
                  <p className="text-sm text-blue-700">
                    Generated from the master template. Includes standard fields
                    and configuration options.
                  </p>
                  <p className="text-xs text-blue-600 mt-2">
                    {selectedBlueprint.fields.length} field
                    {selectedBlueprint.fields.length !== 1 ? "s" : ""} configured
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Contract Name Input */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Contract Name
            </label>
            <input
              type="text"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
              placeholder="e.g. Service Agreement - Q4 2024"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => navigate("/")}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBlueprintSelect}
              disabled={!selectedBlueprintId || blueprints.length === 0}
              className="flex-1 flex items-center justify-center gap-2"
            >
              Continue
              <span>→</span>
            </Button>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </Layout>
  );
};

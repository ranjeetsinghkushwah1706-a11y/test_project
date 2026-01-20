import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContracts } from "../context/ContractContext";
import { useBlueprints } from "../context/BlueprintContext";
import { ContractStatus } from "../models/Contract";
import { canEditContract } from "../utils/lifecycle";
import { ContractForm } from "../components/Contract/ContractForm";
import { ContractActions } from "../components/Contract/ContractActions";
import { LifecycleTimeline } from "../components/Contract/LifecycleTimeline";
import { StatusBadge } from "../components/Common/StatusBadge";
import { Button } from "../components/Common/Button";
import { Layout } from "../components/Common/Layout";
import { BottomNavigation } from "../components/Common/BottomNavigation";

export const ContractDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getContract, updateContract, updateContractStatus } = useContracts();
  const { getBlueprint } = useBlueprints();

  const contract = id ? getContract(id) : undefined;

  if (!contract) {
    return (
      <Layout>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500 mb-4">Contract not found</p>
            <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
          </div>
        </div>
        <BottomNavigation />
      </Layout>
    );
  }

  const blueprint = getBlueprint(contract.blueprintId);
  const isReadOnly = !canEditContract(contract.status);

  const handleSave = (updatedContract: typeof contract) => {
    updateContract(updatedContract);
  };

  const handleStatusChange = (newStatus: ContractStatus) => {
    const success = updateContractStatus(contract.id, newStatus);
    if (!success) {
      alert("Invalid status transition");
    } else {
      // Show success message
      console.log(`Contract status changed to ${newStatus}`);
    }
  };

  const getStatusInfo = () => {
    switch (contract.status) {
      case "SENT":
        return "This contract is currently in the **Sent** stage. You can sign the contract or revoke it. Locking will be available after signature.";
      case "SIGNED":
        return "This contract has been signed. You can now lock it for archiving.";
      case "LOCKED":
        return "This contract is locked and cannot be edited or changed.";
      case "REVOKED":
        return "This contract has been revoked and cannot proceed further.";
      default:
        return "You can approve, send, or revoke this contract.";
    }
  };

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
          <h2 className="text-xl font-bold text-gray-900">Contract Details</h2>
          <div className="flex-1"></div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            ⋯
          </button>
        </div>

        {/* Contract Information Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {contract.name}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                Ref: #{contract.id.slice(-8).toUpperCase()}
              </p>
            </div>
            <StatusBadge status={contract.status} />
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span>📄</span>
              <span className="text-gray-600">Blueprint:</span>
              <span className="font-medium text-gray-900">
                {blueprint?.name || "Unknown"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span className="text-gray-600">Created Date:</span>
              <span className="font-medium text-gray-900">
                {new Date(contract.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Contract Lifecycle Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <LifecycleTimeline
            currentStatus={contract.status}
            createdAt={contract.createdAt}
          />
        </div>

        {/* Available Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
          <div className="text-xs font-semibold text-gray-500 uppercase mb-4">
            Available Actions
          </div>
          <ContractActions
            currentStatus={contract.status}
            onStatusChange={handleStatusChange}
          />
        </div>

        {/* Info Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
              i
            </div>
            <p className="text-sm text-gray-700">
              {getStatusInfo().replace(/\*\*(.*?)\*\*/g, "$1")}
            </p>
          </div>
        </div>

        {/* Contract Fields Form */}
        <div className="mb-6">
          <ContractForm
            contract={contract}
            onSave={handleSave}
            onCancel={() => navigate("/")}
            isReadOnly={isReadOnly}
          />
        </div>
      </div>
      <BottomNavigation />
    </Layout>
  );
};

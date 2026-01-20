import React from "react";
import { ContractStatus } from "../../models/Contract";
import { getValidNextStatuses } from "../../utils/lifecycle";

interface ContractActionsProps {
  currentStatus: ContractStatus;
  onStatusChange: (newStatus: ContractStatus) => void;
}

export const ContractActions: React.FC<ContractActionsProps> = ({
  currentStatus,
  onStatusChange,
}) => {
  const validNextStatuses = getValidNextStatuses(currentStatus);

  const getActionButton = (status: ContractStatus) => {
    const actions: Record<ContractStatus, { label: string; icon: string; variant: "primary" | "secondary" | "danger" }> = {
      CREATED: { label: "Approve Contract", icon: "✓", variant: "primary" },
      APPROVED: { label: "Send Contract", icon: "✈️", variant: "primary" },
      SENT: { label: "Sign Contract", icon: "✍️", variant: "primary" },
      SIGNED: { label: "Lock & Archive", icon: "🔒", variant: "secondary" },
      LOCKED: { label: "", icon: "", variant: "secondary" },
      REVOKED: { label: "Revoke Contract", icon: "✕", variant: "danger" },
    };

    return actions[status];
  };

  const handleAction = (action: ContractStatus) => {
    const buttonInfo = getActionButton(action);
    if (
      window.confirm(
        `Are you sure you want to ${buttonInfo.label.toLowerCase()}?`
      )
    ) {
      onStatusChange(action);
    }
  };

  if (validNextStatuses.length === 0) {
    return (
      <div className="text-gray-500 text-sm">
        No actions available for this status
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {validNextStatuses.map((status) => {
        const buttonInfo = getActionButton(status);
        const isDisabled = status === "LOCKED" && currentStatus !== "SIGNED";

        if (status === "REVOKED") {
          return (
            <button
              key={status}
              onClick={() => handleAction(status)}
              disabled={false}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg border border-red-200 hover:bg-red-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>✕</span>
              <span>Revoke Contract</span>
            </button>
          );
        }

        return (
          <button
            key={status}
            onClick={() => handleAction(status)}
            disabled={isDisabled}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              buttonInfo.variant === "primary"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {buttonInfo.icon && <span>{buttonInfo.icon}</span>}
            <span>{buttonInfo.label}</span>
          </button>
        );
      })}
    </div>
  );
};

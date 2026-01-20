import React from "react";
import { ContractStatus } from "../../models/Contract";

interface StatusBadgeProps {
  status: ContractStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles: Record<ContractStatus, string> = {
    CREATED: "bg-blue-100 text-blue-800",
    APPROVED: "bg-green-100 text-green-800",
    SENT: "bg-yellow-100 text-yellow-800",
    SIGNED: "bg-purple-100 text-purple-800",
    LOCKED: "bg-gray-100 text-gray-800",
    REVOKED: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

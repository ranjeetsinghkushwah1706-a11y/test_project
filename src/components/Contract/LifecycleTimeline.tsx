import React from "react";
import { ContractStatus } from "../../models/Contract";

interface LifecycleTimelineProps {
  currentStatus: ContractStatus;
  createdAt: string;
}

const lifecycleStages: { status: ContractStatus; label: string; icon: string }[] = [
  { status: "CREATED", label: "Created", icon: "✓" },
  { status: "APPROVED", label: "Approved", icon: "✓" },
  { status: "SENT", label: "Sent", icon: "✈️" },
  { status: "SIGNED", label: "Signed", icon: "≡" },
  { status: "LOCKED", label: "Locked", icon: "🔒" },
];

export const LifecycleTimeline: React.FC<LifecycleTimelineProps> = ({
  currentStatus,
  createdAt,
}) => {
  const getStatusIndex = (status: ContractStatus): number => {
    return lifecycleStages.findIndex((s) => s.status === status);
  };

  const currentIndex = getStatusIndex(currentStatus);
  const isCompleted = (index: number) => index <= currentIndex;
  const isCurrent = (index: number) => index === currentIndex;

  const getStatusMessage = (status: ContractStatus): string => {
    switch (status) {
      case "CREATED":
        return new Date(createdAt).toLocaleString();
      case "APPROVED":
        return "Approved";
      case "SENT":
        return "Awaiting counterparty signature";
      case "SIGNED":
        return "Signed";
      case "LOCKED":
        return "Locked and archived";
      default:
        return "";
    }
  };

  return (
    <div className="relative">
      <div className="text-xs font-semibold text-gray-500 uppercase mb-4">
        Contract Lifecycle
      </div>
      <div className="space-y-4">
        {lifecycleStages.map((stage, index) => {
          const completed = isCompleted(index);
          const current = isCurrent(index);
          const pending = index > currentIndex;

          return (
            <div key={stage.status} className="flex items-start gap-4 relative">
              {/* Connector Line */}
              {index < lifecycleStages.length - 1 && (
                <div
                  className={`absolute left-4 top-8 w-0.5 h-8 ${
                    completed ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}

              {/* Status Circle */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                  completed
                    ? "bg-green-500 border-green-500 text-white"
                    : current
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "bg-gray-100 border-gray-300 text-gray-400"
                }`}
              >
                <span className="text-sm">{stage.icon}</span>
              </div>

              {/* Status Info */}
              <div className="flex-1 pt-1">
                <div
                  className={`font-medium ${
                    pending ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  {stage.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {completed || current
                    ? getStatusMessage(stage.status)
                    : "Pending"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

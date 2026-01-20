import React from "react";
import { Contract } from "../../models/Contract";
import { StatusBadge } from "../Common/StatusBadge";
import { Button } from "../Common/Button";
import { useNavigate } from "react-router-dom";

interface ContractTableProps {
  contracts: Contract[];
  blueprintNames: Record<string, string>;
}

export const ContractTable: React.FC<ContractTableProps> = ({
  contracts,
  blueprintNames,
}) => {
  const navigate = useNavigate();

  if (contracts.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
        No contracts found
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contract Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Blueprint Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {contracts.map((contract) => (
            <tr key={contract.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {contract.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {blueprintNames[contract.blueprintId] || "Unknown"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={contract.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(contract.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/contracts/${contract.id}`)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

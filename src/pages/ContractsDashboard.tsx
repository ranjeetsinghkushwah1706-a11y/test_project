import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContracts } from "../context/ContractContext";
import { useBlueprints } from "../context/BlueprintContext";
import { Contract } from "../models/Contract";
import { ContractFilters, FilterType } from "../components/Dashboard/ContractFilters";
import { StatusBadge } from "../components/Common/StatusBadge";
import { Button } from "../components/Common/Button";
import { Layout } from "../components/Common/Layout";
import { BottomNavigation } from "../components/Common/BottomNavigation";

interface SummaryCardProps {
  label: string;
  count: number;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, count, color }) => (
  <div className={`bg-white rounded-xl p-4 shadow-sm ${color}`}>
    <div className="text-sm font-medium text-gray-600 mb-1">{label}</div>
    <div className="text-3xl font-bold text-gray-900">{count}</div>
  </div>
);

interface ContractCardProps {
  contract: Contract;
  blueprintName: string;
  onView: (id: string) => void;
}

const ContractCard: React.FC<ContractCardProps> = ({
  contract,
  blueprintName,
  onView,
}) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{contract.name}</h3>
          <p className="text-sm text-gray-600 mb-2">
            Blueprint: {blueprintName}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>📅</span>
            <span>{new Date(contract.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <StatusBadge status={contract.status} />
      </div>
      <div className="flex gap-2 mt-4">
        <Button
          variant="secondary"
          onClick={() => onView(contract.id)}
          className="flex-1"
        >
          View
        </Button>
        <Button
          variant="primary"
          onClick={() => onView(contract.id)}
          className="flex-1"
        >
          Action
        </Button>
      </div>
    </div>
  );
};

export const ContractsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { contracts } = useContracts();
  const { blueprints } = useBlueprints();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Create blueprint name lookup
  const blueprintNames = useMemo(() => {
    const lookup: Record<string, string> = {};
    blueprints.forEach((bp) => {
      lookup[bp.id] = bp.name;
    });
    return lookup;
  }, [blueprints]);

  // Calculate summary counts
  const summaryCounts = useMemo(() => {
    const active = contracts.filter((c) =>
      ["CREATED", "APPROVED", "SENT"].includes(c.status)
    ).length;
    const pending = contracts.filter((c) =>
      ["CREATED", "APPROVED"].includes(c.status)
    ).length;
    const signed = contracts.filter((c) =>
      ["SIGNED", "LOCKED"].includes(c.status)
    ).length;
    return { active, pending, signed };
  }, [contracts]);

  // Filter contracts based on active filter and search
  const filteredContracts = useMemo(() => {
    let filtered = contracts;

    // Apply status filter
    switch (activeFilter) {
      case "active":
        filtered = filtered.filter((c) =>
          ["CREATED", "APPROVED", "SENT"].includes(c.status)
        );
        break;
      case "pending":
        filtered = filtered.filter((c) =>
          ["CREATED", "APPROVED"].includes(c.status)
        );
        break;
      case "signed":
        filtered = filtered.filter((c) =>
          ["SIGNED", "LOCKED"].includes(c.status)
        );
        break;
      default:
        break;
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          blueprintNames[c.blueprintId]?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [contracts, activeFilter, searchQuery, blueprintNames]);

  const handleViewContract = (id: string) => {
    navigate(`/contracts/${id}`);
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📋</div>
            <h2 className="text-2xl font-bold text-gray-900">Contracts</h2>
          </div>
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            title="Search"
          >
            <span className="text-xl">🔍</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contracts..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <SummaryCard
            label="Active"
            count={summaryCounts.active}
            color=""
          />
          <SummaryCard
            label="Pending"
            count={summaryCounts.pending}
            color=""
          />
          <SummaryCard
            label="Signed"
            count={summaryCounts.signed}
            color=""
          />
        </div>

        {/* Filter Tabs */}
        <ContractFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Contract List */}
        <div className="space-y-4 mt-4">
          {filteredContracts.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-500 mb-4">No contracts found</p>
              <Button onClick={() => navigate("/contracts/create")}>
                Create Your First Contract
              </Button>
            </div>
          ) : (
            filteredContracts.map((contract) => (
              <ContractCard
                key={contract.id}
                contract={contract}
                blueprintName={blueprintNames[contract.blueprintId] || "Unknown"}
                onView={handleViewContract}
              />
            ))
          )}
        </div>
      </div>
      <BottomNavigation />
    </Layout>
  );
};

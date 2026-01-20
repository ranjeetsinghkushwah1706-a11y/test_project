import React from "react";

export type FilterType = "all" | "active" | "pending" | "signed";

interface ContractFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const ContractFilters: React.FC<ContractFiltersProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "signed", label: "Signed" },
  ];

  return (
    <div className="flex space-x-2 mb-4">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeFilter === filter.value
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

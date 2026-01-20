import React, { useState } from "react";
import { Contract } from "../../models/Contract";
import { Field } from "../../models/Field";
import { Button } from "../Common/Button";

interface ContractFormProps {
  contract: Contract;
  onSave: (contract: Contract) => void;
  onCancel: () => void;
  isReadOnly?: boolean;
}

export const ContractForm: React.FC<ContractFormProps> = ({
  contract,
  onSave,
  onCancel,
  isReadOnly = false,
}) => {
  const [name, setName] = useState(contract.name);
  const [fields, setFields] = useState<Field[]>(contract.fields);

  const updateFieldValue = (fieldId: string, value: string | boolean) => {
    setFields(
      fields.map((f) => (f.id === fieldId ? { ...f, value } : f))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a contract name");
      return;
    }

    const updatedContract: Contract = {
      ...contract,
      name: name.trim(),
      fields,
    };

    onSave(updatedContract);
  };

  const renderFieldInput = (field: Field) => {
    if (isReadOnly) {
      return (
        <div className="text-gray-600">
          {field.type === "checkbox" ? (
            field.value ? "✓ Checked" : "☐ Unchecked"
          ) : (
            field.value || "—"
          )}
        </div>
      );
    }

    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            value={(field.value as string) || ""}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
      case "date":
        return (
          <input
            type="date"
            value={(field.value as string) || ""}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
      case "checkbox":
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={field.value === true}
              onChange={(e) => updateFieldValue(field.id, e.target.checked)}
              className="mr-2"
            />
            <span>Check to confirm</span>
          </label>
        );
      case "signature":
        return (
          <div>
            <textarea
              value={(field.value as string) || ""}
              onChange={(e) => updateFieldValue(field.id, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter signature or name"
              rows={2}
            />
            <p className="text-xs text-gray-500 mt-1">
              Signature field - enter name or draw signature
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contract Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isReadOnly}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          placeholder="Enter contract name"
          required
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Contract Fields</h3>
        <div className="space-y-4">
          {fields.length === 0 ? (
            <p className="text-gray-500">No fields in this contract</p>
          ) : (
            fields.map((field) => (
              <div key={field.id} className="border border-gray-200 rounded-md p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label} <span className="text-gray-500">({field.type})</span>
                </label>
                {renderFieldInput(field)}
              </div>
            ))
          )}
        </div>
      </div>

      {!isReadOnly && (
        <div className="flex justify-end space-x-3">
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
          <Button type="submit">Save Contract</Button>
        </div>
      )}
    </form>
  );
};

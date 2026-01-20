import React, { useState } from "react";
import { Blueprint } from "../../models/Blueprint";
import { Field, FieldType } from "../../models/Field";
import { Button } from "../Common/Button";

interface BlueprintFormProps {
  blueprint?: Blueprint;
  onSubmit: (blueprint: Blueprint) => void;
  onCancel: () => void;
}

const FieldTypeOptions: { type: FieldType; icon: string; label: string }[] = [
  { type: "text", icon: "≡", label: "Text" },
  { type: "date", icon: "📅", label: "Date" },
  { type: "signature", icon: "✍️", label: "Signature" },
  { type: "checkbox", icon: "☑️", label: "Checkbox" },
];

export const BlueprintForm: React.FC<BlueprintFormProps> = ({
  blueprint,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState(blueprint?.name || "");
  const [fields, setFields] = useState<Field[]>(blueprint?.fields || []);
  const [selectedFieldType, setSelectedFieldType] = useState<FieldType>("text");
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldX, setFieldX] = useState(10);
  const [fieldY, setFieldY] = useState(25);

  const addFieldToCanvas = () => {
    if (!fieldLabel.trim()) {
      alert("Please enter a field label");
      return;
    }

    const newField: Field = {
      id: Date.now().toString(),
      type: selectedFieldType,
      label: fieldLabel.trim(),
      position: { x: fieldX, y: fieldY },
    };
    setFields([...fields, newField]);
    // Reset field configuration
    setFieldLabel("");
    setFieldX(10);
    setFieldY(25);
  };

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a blueprint name");
      return;
    }

    if (fields.length === 0) {
      alert("Please add at least one field to the blueprint");
      return;
    }

    const blueprintData: Blueprint = {
      id: blueprint?.id || Date.now().toString(),
      name: name.trim(),
      fields,
      createdAt: blueprint?.createdAt || new Date().toISOString(),
    };

    onSubmit(blueprintData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl">⚙️✨</div>
          <h2 className="text-2xl font-bold text-gray-900">
            {blueprint ? "Edit Blueprint" : "New Blueprint"}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" form="blueprint-form">
            Save
          </Button>
        </div>
      </div>

      <form id="blueprint-form" onSubmit={handleSubmit}>
        {/* Blueprint Identity */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-gray-700 uppercase">
              Blueprint Identity
            </label>
            <span className="text-xs text-gray-500">Step 1 of 2</span>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Standard Employment Agreement"
            required
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Field Configuration */}
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="text-sm font-semibold text-gray-700 uppercase block mb-4">
              Field Configuration
            </label>

            {/* Field Type Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FieldTypeOptions.map((option) => (
                  <button
                    key={option.type}
                    type="button"
                    onClick={() => setSelectedFieldType(option.type)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedFieldType === option.type
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.icon}</div>
                    <div className="text-xs font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Field Label */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field Label
              </label>
              <input
                type="text"
                value={fieldLabel}
                onChange={(e) => setFieldLabel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter display label"
              />
            </div>

            {/* Position Inputs */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  X Position (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={fieldX}
                  onChange={(e) => setFieldX(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Y Position (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={fieldY}
                  onChange={(e) => setFieldY(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Add Field Button */}
            <Button
              type="button"
              onClick={addFieldToCanvas}
              className="w-full flex items-center justify-center gap-2"
            >
              <span className="text-xl">+</span>
              Add Field to Canvas
            </Button>
          </div>

          {/* Live Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-semibold text-gray-700 uppercase">
                Live Preview
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50"
                  title="Zoom In"
                >
                  🔍+
                </button>
                <button
                  type="button"
                  className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50"
                  title="Zoom Out"
                >
                  🔍-
                </button>
              </div>
            </div>
            <div className="relative min-h-[400px] bg-white rounded border-2 border-dashed border-gray-400 p-4">
              {fields.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No fields added yet. Configure and add fields to see them here.
                </div>
              ) : (
                fields.map((field) => (
                  <div
                    key={field.id}
                    className={`absolute rounded-lg p-3 border-2 transition-all ${
                      field.type === "signature"
                        ? "bg-blue-50 border-blue-300 border-dashed"
                        : "bg-blue-100 border-blue-400"
                    }`}
                    style={{
                      left: `${field.position.x}%`,
                      top: `${field.position.y}%`,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {field.type === "text" && <span>≡</span>}
                      {field.type === "date" && <span>📅</span>}
                      {field.type === "signature" && <span>✍️</span>}
                      {field.type === "checkbox" && <span>☑️</span>}
                      <span className="text-sm font-medium text-gray-800">
                        {field.label}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Fields are rendered based on their relative coordinates to the document container.
            </p>
          </div>
        </div>

        {/* Blueprint Structure */}
        {fields.length > 0 && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <label className="text-sm font-semibold text-gray-700 uppercase block mb-4">
              Blueprint Structure ({fields.length} {fields.length === 1 ? "field" : "fields"})
            </label>
            <div className="space-y-3">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="bg-white rounded-lg p-4 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {field.type === "text" && "≡"}
                      {field.type === "date" && "📅"}
                      {field.type === "signature" && "✍️"}
                      {field.type === "checkbox" && "☑️"}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{field.label}</div>
                      <div className="text-xs text-gray-500">
                        Type: {field.type.charAt(0).toUpperCase() + field.type.slice(1)} • Pos:{" "}
                        {field.position.x}%, {field.position.y}%
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeField(field.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete field"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 mt-6">
          <Button type="button" onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

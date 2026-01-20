import React from "react";
import { Blueprint } from "../../models/Blueprint";

interface BlueprintPreviewProps {
  blueprint: Blueprint;
}

export const BlueprintPreview: React.FC<BlueprintPreviewProps> = ({
  blueprint,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow border-2 border-dashed border-gray-300">
      <h3 className="text-lg font-semibold mb-4">{blueprint.name}</h3>
      <div className="relative min-h-[400px] bg-gray-50 rounded border-2 border-dashed border-gray-400 p-4">
        {blueprint.fields.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            No fields added yet
          </div>
        ) : (
          blueprint.fields.map((field) => (
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
                  {field.label || "Unnamed"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Created: {new Date(blueprint.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

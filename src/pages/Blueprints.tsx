import React, { useState } from "react";
import { useBlueprints } from "../context/BlueprintContext";
import { Blueprint } from "../models/Blueprint";
import { BlueprintForm } from "../components/Blueprint/BlueprintForm";
import { BlueprintPreview } from "../components/Blueprint/BlueprintPreview";
import { Button } from "../components/Common/Button";
import { Layout } from "../components/Common/Layout";
import { BottomNavigation } from "../components/Common/BottomNavigation";

export const Blueprints: React.FC = () => {
  const { blueprints, addBlueprint, updateBlueprint, deleteBlueprint } =
    useBlueprints();
  const [showForm, setShowForm] = useState(false);
  const [editingBlueprint, setEditingBlueprint] = useState<Blueprint | undefined>();

  const handleSubmit = (blueprint: Blueprint) => {
    if (editingBlueprint) {
      updateBlueprint(blueprint);
      setEditingBlueprint(undefined);
    } else {
      addBlueprint(blueprint);
    }
    setShowForm(false);
  };

  const handleEdit = (blueprint: Blueprint) => {
    setEditingBlueprint(blueprint);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBlueprint(undefined);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this blueprint?")) {
      deleteBlueprint(id);
    }
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Blueprints</h2>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>Create Blueprint</Button>
          )}
        </div>

        {showForm && (
          <div className="mb-8">
            <BlueprintForm
              blueprint={editingBlueprint}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        )}

        {blueprints.length === 0 && !showForm ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-500 mb-4">No blueprints created yet</p>
            <Button onClick={() => setShowForm(true)}>Create Your First Blueprint</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {blueprints.map((blueprint) => (
              <div key={blueprint.id} className="relative">
                <BlueprintPreview blueprint={blueprint} />
                <div className="mt-4 flex space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => handleEdit(blueprint)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(blueprint.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNavigation />
    </Layout>
  );
};

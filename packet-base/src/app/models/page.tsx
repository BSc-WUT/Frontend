"use client";
import React from "react";
import ModelsLayout from "./components/ModelsLayout/ModelsLayout";
import ModelsList from "./components/ModelsList/ModelsList";
import { convertKeysToCamelCase } from "@/hooks/camelizeKeys";
import useModels from "@/hooks/useModels";
import { ModelType } from "@/components/Model/Model";

export default function Models() {
  const { modelsData } = useModels();
  const models: ModelType[] = convertKeysToCamelCase(modelsData);
  return (
    <ModelsLayout>
      <div>
        <ModelsList models={models} />
      </div>
    </ModelsLayout>
  );
}

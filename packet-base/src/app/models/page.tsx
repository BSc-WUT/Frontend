"use client";
import React from "react";
import ModelsLayout from "./components/ModelsLayout/ModelsLayout";
import ModelsList from "./components/ModelsList/ModelsList";
import { snakeToCamel } from "@/hooks/useKeys";
import useModels from "@/hooks/useModels";
import { ModelType } from "@/components/Model/Model";

export default function Models() {
  const { modelsData } = useModels();
  const models: ModelType[] = snakeToCamel(modelsData);
  return (
    <ModelsLayout>
      <div>
        <ModelsList models={models} />
      </div>
    </ModelsLayout>
  );
}

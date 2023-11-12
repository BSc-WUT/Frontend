import React from "react";
import ModelsLayout from "./components/ModelsLayout/ModelsLayout";
import ModelsList from "./components/ModelsList/ModelsList";
import { dummy_models } from "@/dummy";
import { convertKeysToCamelCase } from "@/hooks/camelizeKeys";

export default function Models() {
  const models = convertKeysToCamelCase(dummy_models);
  return (
    <ModelsLayout>
      <div>
        <ModelsList models={models} />
      </div>
    </ModelsLayout>
  );
}

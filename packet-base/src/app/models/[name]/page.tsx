"use client";
import { usePathname, useRouter } from "next/navigation";
import type { GetStaticPaths } from "next";
import PageLayout from "@/components/PageLayout/PageLayout";
import Model, { ModelType } from "../../../components/Model/Model";
import { snakeToCamel } from "@/hooks/useKeys";
import useModels from "@/hooks/useModels";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";

export const getStaticPaths: GetStaticPaths = async () => {
  const { modelsData } = useModels();
  const models: ModelType[] = snakeToCamel(modelsData);
  const paths = models.map((model) => ({ params: { name: model.name } }));
  return {
    paths,
    fallback: false,
  };
};

export default function ModelPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { modelsData, loading, error, getModels } = useModels();
  const [models, setModels] = useState<ModelType[]>([]);
  const currentModelName = pathname.split("/").at(-1) || "";
  const currentModel = models.find((model) => model.name === currentModelName);

  useEffect(() => {
    if (!modelsData.length && !loading && !error) {
      getModels();
    }
  }, [modelsData, loading, error, getModels]);

  useEffect(() => {
    if (!loading && !error && modelsData.length) {
      setModels(snakeToCamel(modelsData));
    }
  }, [modelsData, loading, error]);

  useEffect(() => {
    if (currentModelName && models.length > 0 && !currentModel) {
      router.push("/404");
    }
  }, [currentModelName, models, currentModel, router]);

  return (
    <PageLayout title={`Model page: ${currentModelName}`}>
      {loading && <Loading />}
      {!!error && (
        <Error message={typeof error === "string" ? error : "Error occured"} />
      )}
      {currentModel && <Model {...currentModel} />}
    </PageLayout>
  );
}

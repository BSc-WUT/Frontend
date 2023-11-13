"use client";
import { usePathname, useRouter } from "next/navigation";
import type { GetStaticPaths } from "next";
import { dummy_models } from "@/dummy";
import PageLayout from "@/components/PageLayout/PageLayout";
import Model, { ModelType } from "../../../components/Model/Model";
import { convertKeysToCamelCase } from "@/hooks/camelizeKeys";

export const getStaticPaths: GetStaticPaths = async () => {
  const models = dummy_models;
  const paths = models.map((model) => ({ params: { name: model.name } }));
  return {
    paths,
    fallback: false,
  };
};

export default function ModelPage() {
  const pathname = usePathname();
  const router = useRouter();
  const models: ModelType[] = convertKeysToCamelCase(dummy_models);
  const currentModelName = pathname.split("/").at(-1) || "";
  const currentModel = models
    .filter((model) => model.name == currentModelName)
    .at(0);
  if (!currentModel) {
    router.push("/404");
  }
  return (
    <PageLayout title={`Model page: ${currentModelName}`}>
      {currentModel && <Model {...currentModel} />}
    </PageLayout>
  );
}

"use client";
import Flow from "@/components/Flow/Flow";
import { FlowType } from "@/components/Flow/FlowType";
import PageLayout from "@/components/PageLayout/PageLayout";
import { dummy_flows } from "@/dummy";
import { convertKeysToCamelCase } from "@/hooks/camelizeKeys";
import { GetStaticPaths } from "next";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  const flows = dummy_flows;
  const paths = flows.map((flow) => ({ params: { id: flow.flowId } }));
  return {
    paths,
    fallback: false,
  };
};

export default function FlowPage() {
  const pathname = usePathname();
  const router = useRouter();
  const flows: FlowType[] = convertKeysToCamelCase(dummy_flows);
  const currentFlowId = pathname.split("/").at(-1) || "";
  const currentFlow = flows
    .filter((flow) => flow.flowId == currentFlowId)
    .at(0);
  if (!currentFlow) {
    router.push("/404");
  }
  return (
    <PageLayout title={`Flow: ${currentFlowId}`}>
      {currentFlow && <Flow {...currentFlow} />}
    </PageLayout>
  );
}

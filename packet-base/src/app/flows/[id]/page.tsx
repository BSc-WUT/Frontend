"use client";
import Flow from "@/components/Flow/Flow";
import { FlowType } from "@/components/Flow/FlowType";
import PageLayout from "@/components/PageLayout/PageLayout";
import { dummy_flows } from "@/dummy";
import { convertKeysToCamelCase } from "@/hooks/camelizeKeys";
import useFlows from "@/hooks/useFlows";
import { GetStaticPaths } from "next";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const { flowsData, loading, error, getFlows } = useFlows();
  const [flows, setFlows] = useState<FlowType[]>([]);
  const currentFlowId = pathname.split("/").at(-1) || "";
  const currentFlow = flows.find((flow) => flow.flowId === currentFlowId);

  useEffect(() => {
    if (!flowsData.length && !loading && !error) {
      getFlows();
    }
  }, [flowsData, loading, error, getFlows]);

  useEffect(() => {
    if (!loading && !error && flowsData.length) {
      setFlows(convertKeysToCamelCase(flowsData));
    }
  }, [flowsData, loading, error]);

  useEffect(() => {
    if (currentFlowId && flows.length > 0 && !currentFlow) {
      router.push("/404");
    }
  }, [currentFlowId, flows, currentFlow, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {<>{error}</>}</p>;
  }

  return (
    <PageLayout title={`Flow: ${currentFlowId}`}>
      {currentFlow && <Flow {...currentFlow} />}
    </PageLayout>
  );
}

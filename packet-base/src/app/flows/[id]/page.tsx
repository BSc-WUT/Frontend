"use client";
import Error from "@/components/Error/Error";
import Flow from "@/components/Flow/Flow";
import { FlowType } from "@/components/Flow/FlowType";
import Loading from "@/components/Loading/Loading";
import PageLayout from "@/components/PageLayout/PageLayout";
import { snakeToCamel } from "@/hooks/useKeys";
import useFlows from "@/hooks/useFlows";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function FlowPage() {
  const pathname = usePathname();
  const router = useRouter();
  const { flowsData, loading, error, getFlows } = useFlows();
  const [flows, setFlows] = useState<FlowType[]>([]);
  const currentFlowId = pathname.split("/").at(-1) || "";
  const currentFlow = flows.find((flow) => flow.id === currentFlowId);

  useEffect(() => {
    if (!flowsData.length && !loading && !error) {
      getFlows();
    }
  }, [flowsData, loading, error, getFlows]);

  useEffect(() => {
    if (!loading && !error && flowsData.length) {
      setFlows(snakeToCamel(flowsData));
    }
  }, [flowsData, loading, error]);

  useEffect(() => {
    if (currentFlowId && flows.length > 0 && !currentFlow) {
      router.push("/404");
    }
  }, [currentFlowId, flows, currentFlow, router]);

  return (
    <PageLayout title={`Flow: ${currentFlowId}`}>
      {loading && <Loading />}
      {!!error && (
        <Error message={typeof error === "string" ? error : "Error occured"} />
      )}
      {currentFlow && <Flow {...currentFlow} />}
    </PageLayout>
  );
}

"use client";
import { FlowType } from "@/components/Flow/FlowType";
import PageLayout from "@/components/PageLayout/PageLayout";
import SearchBox from "@/components/SearchBox/SearchBox";
import Table from "@/components/Table/Table";
import { snakeToCamel } from "@/hooks/useKeys";
import useFlows from "@/hooks/useFlows";
import Link from "next/link";
import React, { useState } from "react";
import { Cell, Column } from "react-table";

export default function Flows() {
  const { flowsData } = useFlows();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const flows: FlowType[] = snakeToCamel(flowsData);
  const searchRegx =
    /(?:srcIP:((?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(?:\[\.\]|\.)){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])))?(?:\s?dstIP:((?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(?:\[\.\]|\.)){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])))?/;
  const matches = searchRegx.exec(query);
  const [_, srcIP, dstIP] = matches ? matches : [];

  const conditions: ((flow: FlowType) => void)[] = [];
  if (!query) {
    conditions.push((flow: FlowType) => flow);
  } else if (srcIP && dstIP) {
    conditions.push(
      (flow: FlowType) => flow.srcIp == srcIP && flow.dstIp == dstIP
    );
  } else if (srcIP) {
    conditions.push((flow: FlowType) => flow.srcIp == srcIP);
  } else if (dstIP) {
    conditions.push((flow: FlowType) => flow.dstIp == dstIP);
  } else {
    conditions.push(
      (flow: FlowType) =>
        flow.flowId.startsWith(query) ||
        flow.label?.startsWith(query) ||
        flow.srcIp.startsWith(query) ||
        flow.dstIp.startsWith(query)
    );
  }

  if (startDate) {
    conditions.push((flow: FlowType) => flow.timestamp > startDate);
  }
  if (endDate) {
    conditions.push((flow: FlowType) => flow.timestamp < endDate);
  }

  const filteredFlows = flows.filter((flow) => {
    return conditions.every((condition) => condition(flow));
  });

  const renderFlowLink = (cell: Cell) => {
    const flow: any = cell.row.original;
    return (
      <Link
        href={`/flows/${flow.flowId}`}
        className="w-full underline hover:text-blue-700"
      >
        {flow.flowId}
      </Link>
    );
  };

  const checkLabel = (cell: Cell) => {
    const flow: any = cell.row.original;
    return <>{flow.label ? flow.label : "Unknown"}</>;
  };

  const flowsColumns: Column[] = [
    {
      Header: "Flow ID",
      accessor: "flowId",
      Cell: renderFlowLink,
    },
    {
      Header: "Source IP",
      accessor: "srcIp",
    },
    {
      Header: "Source Port",
      accessor: "srcPort",
    },
    {
      Header: "Destination IP",
      accessor: "dstIp",
    },
    {
      Header: "Destination Port",
      accessor: "dstPort",
    },
    {
      Header: "Protocol",
      accessor: "protocol",
    },
    {
      Header: "Label",
      accessor: "label",
      Cell: checkLabel,
    },
    {
      Header: "Timestamp",
      accessor: "timestamp",
    },
  ];

  return (
    <PageLayout title="Flows">
      <div className="flex-col space-y-4">
        <h3 className="text-lg pb-4">Search flows</h3>
        <SearchBox
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(event?.target.value)
          }
          query={query}
          placeholder="Use search key words: srcIP and dstIP"
          startDate={startDate}
          changeStartDate={(event) => setStartDate(event.target.value)}
          endDate={endDate}
          changeEndDate={(event) => setEndDate(event.target.value)}
        />
        <Table data={filteredFlows} columns={flowsColumns} />
      </div>
    </PageLayout>
  );
}

import { Column } from "react-table";
import Table from "../Table/Table";
import { FlowType } from "./FlowType";
import Button from "../Button/Button";
import Link from "next/link";
import CloseIcon from "../../../public/close.svg";

interface FlowRowType {
  property: string;
  value: number | string;
  description: string;
}

const Flow: React.FC<FlowType> = (props) => {
  const flowData: FlowRowType[] = [
    {
      property: "Flow ID",
      value: props.flowId,
      description: " ",
    },
    {
      property: "Source IP",
      value: props.srcIp,
      description: " ",
    },
    {
      property: "Source Port",
      value: props.srcPort,
      description: " ",
    },
    {
      property: "Destination IP",
      value: props.dstIp,
      description: " ",
    },
    {
      property: "Destination Port",
      value: props.dstPort,
      description: " ",
    },
    {
      property: "Porotocol",
      value: props.protocol,
      description: " ",
    },
    {
      property: "Timestamp",
      value: props.timestamp,
      description: " ",
    },
    {
      property: "Flow Duration",
      value: props.flowDuration,
      description: " ",
    },
    {
      property: "Flow Bytes Transfered per Second",
      value: props.flowBytsS,
      description: " ",
    },
    {
      property: "Flow Packets Transfered per Second",
      value: props.flowPktsS,
      description: " ",
    },
    {
      property: "Fowrarded Bytes per Second",
      value: props.fwdBytsBAvg,
      description: " ",
    },
    {
      property: "Fowrarded Packets per Second",
      value: props.fwdPktsS,
      description: " ",
    },
    {
      property: "Total Backwarded Packets",
      value: props.totBwdPkts,
      description: " ",
    },
    {
      property: "Total Forwarded Packets",
      value: props.totFwdPkts,
      description: " ",
    },
    {
      property: "Total Length Backwarded Packets",
      value: props.totlenBwdPkts,
      description: " ",
    },
    {
      property: "Total Length Forwarded Packets",
      value: props.totlenFwdPkts,
      description: " ",
    },
    {
      property: "Forwarded Packet Max Length",
      value: props.fwdPktLenMax,
      description: " ",
    },
    {
      property: "Forwarded Packet Min Length",
      value: props.fwdPktLenMin,
      description: " ",
    },
    {
      property: "Forwarded Packet Mean Length",
      value: props.fwdPktLenMean,
      description: " ",
    },
  ];

  const flowColumns: Column[] = [
    {
      Header: "Property",
      accessor: "property",
    },
    {
      Header: "Value",
      accessor: "value",
    },
    {
      Header: "description",
      accessor: "description",
    },
  ];

  const handlePredictAgain = () => {};

  const handleSetAsDangerous = () => {};

  return (
    <div className="relative h-max flex-col space-y-12">
      <div className="h-1/2 flex space-x-4">
        <Link href="/flows">
          <div className="flex space-x-4 items-center w-fit rounded-lg border-2 border-white hover:bg-white transition-all hover:text-black px-4 py-2">
            <CloseIcon viewBox="0 0 24 24" height={24} />
            <button>Get back</button>
          </div>
        </Link>
        <Button
          title="Predict again"
          type="button"
          hoverStyle="hover_white"
          onClick={() => handlePredictAgain()}
        />
        <Button
          title="Set as dangerous"
          type="button"
          hoverStyle="hover_white"
          onClick={() => handleSetAsDangerous()}
        />
      </div>
      <div className="flex-col space-y-4 h-1/2">
        <h1 className="text-2xl">Flow Parameters</h1>
        <Table columns={flowColumns} data={flowData} />
      </div>
    </div>
  );
};

export default Flow;

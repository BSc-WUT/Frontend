import { Column } from "react-table";
import Table from "../Table/Table";
import { FlowType } from "./FlowType";
import Button from "../Button/Button";
import Link from "next/link";
import CloseIcon from "../../../public/close.svg";
import Status from "../Status/Status";
import useModels from "@/hooks/useModels";
import { ModelType } from "../Model/Model";
import { camelToSnake, snakeToCamel } from "@/hooks/useKeys";
import { useRef, useState } from "react";
import Modal from "../Modal/Modal";

interface FlowRowType {
  property: string;
  value: number | string;
  description: string;
}

const Flow: React.FC<FlowType> = (props) => {
  const changeLabelRef = useRef<HTMLInputElement>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [label, setLabel] = useState<string>(
    props.label ? props.label : "Unknown"
  );
  const { modelsData, predict, response } = useModels();
  const models: ModelType[] = snakeToCamel(modelsData);
  const flowData: FlowRowType[] = [
    {
      property: "Flow ID",
      value: props.id,
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

  const handlePredictAgain = () => {
    const activeModelName = models
      .filter((model) => model.isActive)
      .at(0)!.name;
    if (activeModelName) {
      predict(activeModelName, camelToSnake(props));
      setLabel(response ? response : "Unknown");
    }
  };

  const handleSetAsDangerous = () => {
    setOpenModal(true);
  };

  const changeFlowLabel = () => {
    const newLabel = changeLabelRef.current?.value
      ? changeLabelRef.current?.value
      : "Unknown";
    setLabel(newLabel);
    setOpenModal(false);
  };

  return (
    <>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <div className="flex flex-col space-y-4">
          <input
            ref={changeLabelRef}
            className="border outline-0 text-white rounded-lg px-4 py-2 focus:outline-0 focus:border-2 focus:border-blue-700 content-center bg-gray-700"
            placeholder="New Label..."
          />
          <Button
            title="Change label"
            type="button"
            hoverStyle="hover_blue"
            onClick={() => changeFlowLabel()}
          />
        </div>
      </Modal>
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
            title="Change label"
            type="button"
            hoverStyle="hover_white"
            onClick={() => handleSetAsDangerous()}
          />
          <Status message={label} />
        </div>
        <div className="flex-col space-y-4 h-1/2">
          <h1 className="text-2xl">Flow Parameters</h1>
          <Table columns={flowColumns} data={flowData} />
        </div>
      </div>
    </>
  );
};

export default Flow;

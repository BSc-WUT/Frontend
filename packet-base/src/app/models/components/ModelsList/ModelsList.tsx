"use client";
import Table from "@/components/Table/Table";
import { ModelType } from "../../../../components/Model/Model";
import Button from "@/components/Button/Button";
import ToggleCheckButton from "../ToggleCheckButton/ToggleCheckButton";
import { Cell, Column } from "react-table";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import useModels from "@/hooks/useModels";

interface ModelsListProps {
  models: ModelType[];
}

const ModelsList: React.FC<ModelsListProps> = ({ models }) => {
  const { changeModelActivation } = useModels();
  const activeModel = models.filter((model) => model.isActive).at(0);
  const [activeModelName, setActiveModel] = useState<string>("");

  useEffect(() => {
    setActiveModel(activeModel ? activeModel.name : "");
  }, [activeModel]);

  const renderCheckbox = (cell: Cell) => {
    const model: any = cell.row.original;
    return (
      <ToggleCheckButton
        isChecked={model.name == activeModelName}
        onChange={() => {
          setActiveModel(model.name);
        }}
      />
    );
  };

  const renderModelLink = (cell: Cell) => {
    const model: any = cell.row.original;
    return (
      <Link
        href={`/models/${model.name}`}
        className="underline hover:text-blue-700"
      >
        {model.name}
      </Link>
    );
  };

  const saveActiveModel = (activeModelName: string) => {
    const activeModel = models
      .filter((model) => model.name == activeModelName)
      .at(0);
    if (activeModel) {
      changeModelActivation(true, activeModelName);
      models
        .filter((model) => model.name != activeModelName)
        .forEach((model) => {
          changeModelActivation(false, model.name);
        });
    }
  };

  const modelsColumns: Column[] = [
    {
      Header: "Active",
      accessor: undefined,
      Cell: renderCheckbox,
    },
    {
      Header: "Name",
      accessor: "name",
      Cell: renderModelLink,
    },
    {
      Header: "Total Params",
      accessor: "totalParams",
    },
    {
      Header: "Estimated Model Size (MB)",
      accessor: "estimatedTotalSizeMB",
    },
  ];
  return (
    <div className="flex-col space-y-12">
      <Table data={models} columns={modelsColumns} />
      <Button
        title="Set as active"
        type="button"
        hoverStyle="hover_white"
        onClick={() => saveActiveModel(activeModelName)}
      />
    </div>
  );
};

export default ModelsList;

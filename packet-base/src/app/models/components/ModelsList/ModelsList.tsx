"use client";

import Table from "@/components/Table/Table";
import { ModelType } from "../../../../components/Model/Model";
import Button from "@/components/Button/Button";
import ToggleCheckButton from "../ToggleCheckButton/ToggleCheckButton";
import { Cell, Column } from "react-table";
import React, { useState } from "react";
import Link from "next/link";

interface ModelsListProps {
  models: ModelType[];
}

const ModelsList: React.FC<ModelsListProps> = ({ models }) => {
  const [activeModel, setActiveModel] = useState<string>(
    models.filter((model) => model.isActive).map((model) => model.name)[0]
  );
  const renderCheckbox = (cell: Cell) => {
    const model: any = cell.row.original;
    return (
      <ToggleCheckButton
        isChecked={model.name == activeModel}
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
    const activeModel = models.filter((model) => model.name == activeModelName);
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
        onClick={() => saveActiveModel(activeModel)}
      />
    </div>
  );
};

export default ModelsList;

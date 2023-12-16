"use client";
import CloseIcon from "../../../public/close.svg";
import Link from "next/link";
import Button from "../Button/Button";
import NumberDisplay from "../NumberDisplay/NumberDisplay";
import useModels from "@/hooks/useModels";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { useRouter } from "next/navigation";
import { snakeToCamel } from "@/hooks/useKeys";
import { useState } from "react";

interface Layer {
  layerName: string;
  inputShape: string;
  outputShape: string;
  params: number;
  kernelSize: string;
}

export interface ModelType {
  isActive: boolean;
  layers: Layer[];
  name: string;
  totalParams: number;
  trainableParams: number;
  nonTrainableParams: number;
  totalMultAdds: number;
  inputSizeMB: number;
  forwardBackwardPassSizeMB: number;
  paramsSizeMB: number;
  estmiatedTotalSizeMB: number;
}

const Model: React.FC<ModelType> = ({
  layers,
  name,
  totalParams,
  trainableParams,
  nonTrainableParams,
  totalMultAdds,
  inputSizeMB,
  forwardBackwardPassSizeMB,
  paramsSizeMB,
  estmiatedTotalSizeMB,
  isActive,
}) => {
  const { deleteModel, loading, error, changeModelActivation, modelsData } =
    useModels();
  const models: ModelType[] = snakeToCamel(modelsData);
  const router = useRouter();
  const [modelActive, setModelActive] = useState<boolean>(isActive);
  const layersComp = layers.map((layer, key) => {
    return <p key={key}>{layer.layerName}</p>;
  });

  const setModelAsActive = () => {
    models
      .filter((model) => model.name != name)
      .forEach((model) => {
        changeModelActivation(false, model.name);
      });
    changeModelActivation(true, name);
    setModelActive(true);
  };

  const handleDelete = () => {
    deleteModel(name);
    setTimeout(() => {
      router.push("/models");
    }, 300);
  };

  return (
    <div className="flex-col space-y-12 space-x-4">
      <div className="flex space-x-4">
        <Link href="/models">
          <div className="flex space-x-4 items-center w-fit rounded-lg border-2 border-white hover:bg-white transition-all hover:text-black px-4 py-2">
            <CloseIcon viewBox="0 0 24 24" height={24} />
            <button>Get back</button>
          </div>
        </Link>
        {!modelActive && (
          <Button
            title="Set as active model"
            type="button"
            hoverStyle="hover_white"
            onClick={() => setModelAsActive()}
          />
        )}
        {modelActive && (
          <div className="w-fit rounded-lg border-2 border-green-700 text-green-700 bg-green-100 hover:bg-white transition-all px-4 py-2">
            Model is set as active
          </div>
        )}
        <Button
          title="Delete Model"
          hoverStyle="hover_red"
          onClick={() => handleDelete()}
          type="button"
        />
      </div>

      <div className="flex-col w-fit space-y-14 ">
        <div className="flex-col space-y-6">
          <h1 className="text-2xl">Model Structure</h1>
          <div>{layersComp}</div>
        </div>
        <div className="flex-col space-y-4">
          <h1 className="text-2xl">Model Params</h1>
          <div className="grid grid-rows-2 grid-flow-col gap-4">
            <NumberDisplay
              number={totalParams}
              title="Total Params"
              className="row-span-2"
            />
            <NumberDisplay
              number={trainableParams}
              title="Trainable Params"
              className="col-span-2"
            />
            <NumberDisplay
              number={nonTrainableParams}
              title="Non Trainable Params"
              className="col-span-2 row-span-1"
            />
          </div>
        </div>
        <div className="flex-col space-y-4">
          <h1 className="text-2xl">Model Size (MB)</h1>
          <div className="grid grid-cols-2 gap-4">
            <NumberDisplay
              number={estmiatedTotalSizeMB}
              title="Estimated size"
            />
            <NumberDisplay number={inputSizeMB} title="Input Size" />
            <NumberDisplay
              number={forwardBackwardPassSizeMB}
              title="Forward Backward Pass Size"
            />
            <NumberDisplay number={paramsSizeMB} title="Params Size" />
          </div>
        </div>
      </div>

      {error && <Error message={error} />}
      {loading && <Loading />}
    </div>
  );
};

export default Model;

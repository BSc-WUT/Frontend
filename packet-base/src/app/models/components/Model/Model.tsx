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
}) => {
  return <>{layers}</>;
};

export default Model;

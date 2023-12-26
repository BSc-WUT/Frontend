"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from "axios";
import {
  ACTIVATE_MODEL_ENDPOINT,
  DEACTIVATE_MODEL_ENDPOINT,
  DELETE_MODEL_ENDPOINT,
  GET_MODELS_ENDPOINT,
  PREDICT_ENDPOINT,
  UPLOAD_MODEL_ENDPOINT,
} from "@/app/api/endpoints";
import { FlowType } from "@/components/Flow/FlowType";

const useModels = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [modelsData, setModels] = useState([]);
  const [response, setResponse] = useState();
  const getModels = async () => {
    setLoading(true);

    try {
      const config: AxiosRequestConfig = {
        method: "GET",
        url: GET_MODELS_ENDPOINT,
      };
      const response = await axios(config);
      const modelsData = response.data;
      setModels(modelsData);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.message);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    getModels();
  }, []);

  const deleteModel = async (modelName: string) => {
    setLoading(true);
    try {
      const config: AxiosRequestConfig = {
        method: "DELETE",
        url: `${DELETE_MODEL_ENDPOINT}${modelName}`,
      };
      const response = await axios(config);
      setResponse(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.message);
      }
    }
    setLoading(false);
  };

  const uploadModel = async (file: File) => {
    setLoading(true);
    try {
      const uploadData = new FormData();
      uploadData.append("model_file", file);
      const config: AxiosRequestConfig = {
        method: "POST",
        url: UPLOAD_MODEL_ENDPOINT,
        data: uploadData,
      };
      const response = await axios(config);
      setResponse(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.message);
      }
    }
    setLoading(false);
  };

  const changeModelActivation = async (
    isActive: boolean,
    modelName: string
  ) => {
    setLoading(true);
    const endpoint = isActive
      ? ACTIVATE_MODEL_ENDPOINT
      : DEACTIVATE_MODEL_ENDPOINT;

    try {
      const config: AxiosRequestConfig = {
        method: "GET",
        url: `${endpoint}${modelName}`,
      };
      const response = await axios(config);
      setResponse(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.message);
      }
    }

    setLoading(false);
  };

  const predict = async (modelName: string, flow: FlowType) => {
    setLoading(true);
    try {
      const config: AxiosRequestConfig = {
        method: "POST",
        url: `${PREDICT_ENDPOINT}${modelName}`,
        data: flow,
      };
      const response = await axios(config);
      setResponse(response.data.prediction);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.message);
      }
    }
  };

  return {
    modelsData,
    loading,
    error,
    getModels,
    deleteModel,
    uploadModel,
    response,
    changeModelActivation,
    predict,
  };
};

export default useModels;

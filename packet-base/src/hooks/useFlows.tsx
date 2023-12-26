import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { GET_FLOWS_ENDPOINT } from "@/app/api/endpoints";

const useFlows = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>();
  const [flowsData, setFlows] = useState([]);
  const getFlows = async () => {
    setLoading(true);

    try {
      const config: AxiosRequestConfig = {
        method: "GET",
        url: GET_FLOWS_ENDPOINT,
      };
      const response = await axios(config);
      const data = response.data;
      const flowsData = data;
      setFlows(flowsData);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getFlows();
  }, []);

  return { flowsData, loading, error, getFlows };
};

export default useFlows;

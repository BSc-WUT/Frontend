import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { GET_FLOWS_ENDPOINT } from "@/app/api/dbEndpoints";

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
      const data = response.data.hits.hits;
      const flowsData = data.map(
        ({ _id, _source }: { _id: any; _source: any }) => ({
          flow_id: _id,
          ..._source,
        })
      );
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

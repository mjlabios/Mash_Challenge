import { useState } from "react";
import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "/",
});

interface axiosServiceProps {
  method: string;
  url: string;
}
export const axiosService = (props: axiosServiceProps) => {
  const [response, setResponse] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const execute = async (data?: any, config: any = {}) => {
    setLoading(true);

    try {
      let header = config;

      let rData = undefined;
      if (data !== undefined) {
        if (Object.keys(data).length > 0) {
          rData = data;
        }
        if (config !== undefined) {
          rData = data;
        }
      }
      const result: any = await axiosAPI.request({
        method: props.method,
        url: props.url,
        data: rData,
        headers: header,
      });
      setResponse(result.data);
    } catch (error: any) {
   
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, execute: execute };
};

import {useContext, useState} from 'react';
import axios from 'axios';
import {Platform} from 'react-native';
import {ENDPOINTS} from '../constants/endpoints';

const axiosAPI = axios.create({
  baseURL:
    Platform.OS === 'android' ? ENDPOINTS.BASE_URL_ANDROID : ENDPOINTS.BASE_URL_IOS,
});

interface useAxiosProps {
  method: string;
  url: string;
}
export const axiosService = (setup: useAxiosProps) => {
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
        method: setup.method,
        url: setup.url,
        data: rData,
        headers: header,
      });
      setResponse(result.data);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  return {response, loading, execute: execute};
};
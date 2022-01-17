import axios, { AxiosResponse } from "axios";

const request = {
  get: async (query: string, headers?: AxiosResponse["headers"]) =>
    await axios.get(query, {
      ...headers,
      withCredentials: false,
    }),
  post: async <T>(query: string, data: T, headers?: AxiosResponse["headers"]) =>
    await axios.post(query, data, { ...headers, withCredentials: false }),
  patch: async <T>(
    query: string,
    data: T,
    headers?: AxiosResponse["headers"]
  ) => await axios.patch(query, data, { ...headers, withCredentials: false }),
  delete: async (query: string, headers?: AxiosResponse["headers"]) =>
    await axios.delete(query, { ...headers, withCredentials: false }),
};

export default request;

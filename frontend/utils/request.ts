import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import customAxios from "./customAxios";
import { getLocalStorage } from "./localStorage";

const request = {
  get: async (query: string, headers?: { [key in string]: string }) => {
    return await customAxios.get(query, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
        ...headers
      },
      withCredentials: false
    });
  },

  post: async <T>(query: string, data: T, headers?: { [key in string]: string }) => {
    return await customAxios.post(query, data, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
        ...headers
      },
      withCredentials: false
    });
  },

  patch: async <T>(query: string, data: T, headers?: { [key in string]: string }) => {
    return await customAxios.patch(query, data, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
        ...headers
      },
      withCredentials: false
    });
  },

  delete: async (query: string, headers?: { [key in string]: string }) => {
    return await customAxios.delete(query, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
        ...headers
      },
      withCredentials: false
    });
  }
};

export default request;

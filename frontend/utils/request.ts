import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import { bearerAxios } from "./bearerAxios";
import { getLocalStorage } from "./localStorage";

const request = {
  get: async (query: string, headers?: { [key in string]: string }) => {
    return await bearerAxios.get(query, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
        ...headers
      },
      withCredentials: false
    });
  },

  post: async <T>(query: string, data: T, headers?: { [key in string]: string }) => {
    return await bearerAxios.post(query, data, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
        ...headers
      },
      withCredentials: false
    });
  },

  patch: async <T>(query: string, data: T, headers?: { [key in string]: string }) => {
    return await bearerAxios.patch(query, data, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
        ...headers
      },
      withCredentials: false
    });
  },

  delete: async (query: string, headers?: { [key in string]: string }) => {
    return await bearerAxios.delete(query, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN)}`,
        ...headers
      },
      withCredentials: false
    });
  }
};

export default request;

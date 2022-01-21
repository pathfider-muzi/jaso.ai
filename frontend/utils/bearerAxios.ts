import API_ENDPOINT from "@/constants/apiEndPoint";
import axios from "axios";

export const bearerAxios = axios.create({
  baseURL: API_ENDPOINT
});

export const axiosBearerOption = {
  _interceptorId: -1,

  setAccessToken(_accessToken: string) {
    this._interceptorId = bearerAxios.interceptors.request.use(config => {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${_accessToken}`;
      }

      return config;
    });
  },

  clear() {
    bearerAxios.interceptors.request.eject(this._interceptorId);
  }
};

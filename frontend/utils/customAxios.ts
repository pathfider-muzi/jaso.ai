import API_ENDPOINT from "@/constants/apiEndPoint";
import axios from "axios";

const customAxios = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 500 * 1000
});

export default customAxios;

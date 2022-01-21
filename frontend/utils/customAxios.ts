import API_ENDPOINT from "@/constants/apiEndPoint";
import axios from "axios";

const customAxios = axios.create({
  baseURL: API_ENDPOINT
});

export default customAxios;

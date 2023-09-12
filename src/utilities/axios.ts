import axios from "axios";
import { config } from "./config";

export const backendAxios = axios.create({
  baseURL: config.backendUrl,
});

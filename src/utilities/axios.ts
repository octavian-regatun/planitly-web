import axios, { AxiosResponse } from "axios";
import { config } from "./config";
import { ZodSchema } from "zod";

export const backendAxios = axios.create({
  baseURL: config.backendUrl,
});

export const mapAxiosResponse = <T1, T2>(
  axiosResponse: AxiosResponse<T1, any>,
  zodSchema: ZodSchema<T2>
) => {
  const { data, ...rest } = axiosResponse;
  return {
    response: zodSchema.parse(data),
    ...rest,
  };
};

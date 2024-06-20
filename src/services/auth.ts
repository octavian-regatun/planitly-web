import { backendAxios } from "@/utilities/axios";
import { decodeJwt } from "jose";
import {} from "next/navigation";

export const authService = {
  signIn: async (data: SignInRequest) => {
    return (await backendAxios.post<string>("/auth/google", data)).data;
  },
  signOut: () => {
    authService.removeJwt();
    location.href = "/";
  },
  getJwt: () => {
    return localStorage.getItem("jwt");
  },
  setJwt: (jwt: string) => {
    return localStorage.setItem("jwt", jwt);
  },
  removeJwt: () => {
    return localStorage.removeItem("jwt");
  },
  getDecodedJwt: (jwt: string) => {
    return decodeJwt(jwt);
  },
};

export interface SignInRequest {
  code: string;
}

export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
  expiry_date: number;
}

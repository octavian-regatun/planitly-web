import { backendAxios } from "@/utilities/axios";

export interface User {
  id: number;
  username: string;
  picture: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  role: string;
  authProvider: string;
  createdAt: string;
  updatedAt: string;
  iat: number;
  exp: number;
}

export interface PublicUser {
  id: number;
  username: string;
  picture: string;
  firstName: string;
  lastName: string;
}

export const usersService = {
  async findMe() {
    return (await backendAxios.get<User>("users/me")).data;
  },
  async findById(id: number) {
    return (await backendAxios.get<PublicUser>(`users/${id}`)).data;
  },
  async findByIds(ids: number[]) {
    return await backendAxios.get<PublicUser[]>(`users`, {
      params: { ids },
    });
  },
  async findAll() {
    return (await backendAxios.get<User[]>("users")).data;
  },
  async update(id: number, data: Partial<User>) {
    return await backendAxios.patch<User>(`users/${id}`, data);
  },
  async search(query: string) {
    return (
      await backendAxios.get<User[]>(`users/search`, {
        params: { query },
      })
    ).data;
  },
};

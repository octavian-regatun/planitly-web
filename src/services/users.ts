import { backendAxios, mapAxiosResponse } from "@/utilities/axios";
import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  picture: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  gender: z.string(),
  role: z.string(),
  authProvider: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export const publicUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  picture: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type PublicUser = z.infer<typeof publicUserSchema>;

export const usersService = {
  async findMe() {
    return (await backendAxios.get<User>("/users/me")).data;
  },
  async findById(id: number) {
    return (await backendAxios.get<PublicUser>(`/users/${id}`)).data;
  },
  async findByIds(ids: number[]) {
    return await backendAxios.get<PublicUser[]>(`/users`, {
      params: { ids },
    });
  },
  async findAll() {
    const response = await backendAxios.get("/users");

    return mapAxiosResponse(response, z.array(publicUserSchema));
  },
  async update(id: number, data: Partial<User>) {
    return await backendAxios.patch<User>(`/users/${id}`, data);
  },
  async search(query: string) {
    return (
      await backendAxios.get<User[]>(`/users/search`, {
        params: { query },
      })
    ).data;
  },
};

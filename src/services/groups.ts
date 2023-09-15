import { backendAxios } from "@/utilities/axios";
import { PublicUser } from "./users";

export interface CreateGroupDto {
  name: string;
  description: string;
  picture: string;
  members: number[];
}

export interface Group {
  id: number;
  name: string;
  description: string;
  picture: string;
  members: PublicUser[];
  createdAt: string;
  updatedAt: string;
}

export const groupsService = {
  async find() {
    return await backendAxios.get<Group[]>("groups");
  },
  async create(group: CreateGroupDto) {
    return await backendAxios.post<Group>("groups", group);
  },
};

import { backendAxios } from "@/utilities/axios";
import { PublicUser } from "./users";

export interface CreateGroupDto {
  name: string;
  description: string;
  picture: string;
  members: number[];
}

export interface GroupMember {
  id: number;
  userId: number;
  groupId: number;
  role: "ADMIN" | "MEMBER";
  createdAt: string;
  updatedAt: string;
  user: PublicUser;
}

export interface Group {
  id: number;
  name: string;
  description: string;
  picture: string;
  groupMembers: GroupMember[];
  createdAt: string;
  updatedAt: string;
}

export const groupsService = {
  async find() {
    return await backendAxios.get<Group[]>("groups");
  },
  async findById(id: number) {
    return await backendAxios.get<Group>(`groups/${id}`);
  },
  async create(group: CreateGroupDto) {
    return await backendAxios.post<Group>("groups", group);
  },
};

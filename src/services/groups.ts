import { backendAxios } from "@/utilities/axios";
import { z } from "zod";
import { publicUserSchema, userSchema } from "./users";

export const groupMemberSchema = z.object({
  id: z.number(),
  userId: z.number(),
  groupId: z.number(),
  role: z.enum(["ADMIN", "MEMBER"]),
  status: z.enum(["PENDING", "ACCEPTED"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: publicUserSchema,
});

export const groupSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  picture: z.string(),
  groupMembers: z.array(groupMemberSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createGroupDto = z.object({
  name: z.string(),
  description: z.string(),
  picture: z.string(),
  members: z.array(z.number()),
});

export type GroupMember = z.infer<typeof groupMemberSchema>;
export type CreateGroupDto = z.infer<typeof createGroupDto>;
export type Group = z.infer<typeof groupSchema>;

export const groupsService = {
  async find() {
    return await backendAxios.get<Group[]>("/groups");
  },
  async findById(id: number) {
    return await backendAxios.get<Group>(`/groups/${id}`);
  },
  async create(group: CreateGroupDto) {
    return await backendAxios.post<Group>("/groups", group);
  },
  async delete(id: number) {
    return await backendAxios.delete(`/groups/${id}`);
  },
};

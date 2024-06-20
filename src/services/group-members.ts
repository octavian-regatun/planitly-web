import { backendAxios } from "@/utilities/axios";
import { Group, GroupMember } from "./groups";

export const groupMembersService = {
  async create({ groupId, userId }: { groupId: number; userId: number }) {
    return backendAxios.post<GroupMember>("/group-members", { groupId, userId });
  },
  async delete(id: number) {
    return await backendAxios.delete(`/group-members/${id}`);
  },
  async findMeByGroupId(groupId: number) {
    return await backendAxios.get<GroupMember[]>(
      `/group-members/groups/${groupId}/me`
    );
  },
  async accept(groupId: number) {
    return await backendAxios.patch<GroupMember>(`/group-members/${groupId}`);
  },
  getMemberFromGroupByUserId(group: Group, userId: number) {
    return group.groupMembers.find(member => member.userId === userId);
  },
};

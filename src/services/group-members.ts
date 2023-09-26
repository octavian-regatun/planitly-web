import { backendAxios } from "@/utilities/axios";
import { Group } from "./groups";

export const groupMembersService = {
  async delete(id: number) {
    return await backendAxios.delete(`group-members/${id}`);
  },
};

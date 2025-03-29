import { authApi } from "@/lib/axios";
import { Contribution, Group, GroupMember, User } from "@/lib/types";

export class AdminService {
  static async getGroups(): Promise<Group[]> {
    const response = await authApi.get("/groups");
    console.log(response.data.data);
    return response.data.data;
  }

  static async createGroup(
    req: Omit<Group, "created_at" | "id" | "date_created">
  ): Promise<Group> {
    const response = await authApi.post("/groups/", req);
    return await response.data.data;
  }

  static async getAllUsers(): Promise<User[]> {
    const response = await authApi.get("/users");
    return response.data.data;
  }

  static async getGroupById(groupId: number): Promise<Group> {
    const response = await authApi.get(`/groups/${groupId}`);
    return response.data.data;
  }

  static async addMemberToGroup(memberData: {
    position: number;
    is_admin: boolean;
    is_owner: boolean;
    is_manager: boolean;
    status: string;
    user: number;
    group: number;
  }): Promise<GroupMember> {
    const response = await authApi.post("/groups/users/add", memberData);
    return response.data.data;
  }

  static async getGroupMembers(groupId: number): Promise<GroupMember[]> {
    const response = await authApi.get(`/groups/${groupId}/users`);
    return response.data.data;
  }

  static async getContributions(): Promise<Contribution[]> {
    const response = await authApi.get(`/contributions/`);
    return response.data.data;
  }

  static async getContributionById(id: number): Promise<Contribution[]> {
    const response = await authApi.get(`/contributions/${id}`);
    return response.data.data;
  }

  static async disburseFund(contributionId: number) {
    console.log(contributionId);
    const response = await authApi.post(
      `/admin/disburse-fund/${contributionId}/`
    );
    return response.data.data;
  }

  static async sendReminder(contributionId: number) {
    console.log(contributionId);
    const response = await authApi.post(
      `/admin/send-reminder/${contributionId}/`
    );
    return response.data.data;
  }
}

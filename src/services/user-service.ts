import { authApi } from "@/lib/axios";
import { AuthUser, Contribution, DashboardData, User } from "@/lib/types";

export class UserService {
  static async updateUser(
    id: number,
    req: Omit<Partial<User>, "date_created" | "last_login" | "id">
  ): Promise<AuthUser> {
    try {
      const response = await authApi.patch(`/users/${id}/`, req);
      return response.data.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  static async getUser(id: number): Promise<User> {
    const response = await authApi.patch(`/users/${id}/`);
    return response.data;
  }

  static async dashboardData(): Promise<DashboardData> {
    const response = await authApi.get("/dashboard/user-data/");
    return response.data.data;
  }

  static async getContributions(): Promise<Contribution[]> {
    const response = await authApi.get("/contributions/");
    return response.data.data;
  }

  static async getSingleContribution(groupId: string): Promise<Contribution> {
    const response = await authApi.get(`/contributions/${groupId}/`);
    return response.data.data;
  }

  static async fundContribution(contribution_id: number, amount: number) {
    const data = {
      contribution_id,
      amount,
      is_wallet: true,
    };

    const response = await authApi.post("/payments/fund-contribution/", data);
    return response.data.data;
  }
}

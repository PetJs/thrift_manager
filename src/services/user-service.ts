import { axs } from "@/lib/axios";
import { ApiResponse, AuthUser } from "@/lib/types";
import { User } from "@/types";

export class UserService {
  static async updateUser(
    id: number,
    req: Omit<Partial<User>, "date_created" | "last_login" | "id">
  ): Promise<ApiResponse<AuthUser>> {
    try {
      const response = await axs.patch(`/users/${id}/`, req);
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }
}

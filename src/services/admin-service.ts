import { authApi } from "@/lib/axios";
import { Group } from "@/lib/types";

export class AdminService {
  static async getGroups(): Promise<Group[]> {
    const response = await authApi.get("/groups");
    return response.data.data;
  }

  static async createGroup(
    req: Omit<Group, "created_at" | "id" | "date_created">
  ): Promise<Group> {
    const response = await authApi.post("/groups/", req);
    return response.data.data;
  }
}

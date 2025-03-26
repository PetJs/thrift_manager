import type { UserRole } from "@/types";
import type { User } from "@/types";
import type { StateCreator } from "zustand";
import { create } from "zustand";
import type { PersistOptions } from "zustand/middleware";
import { persist } from "zustand/middleware";

export interface UserStore {
  user: User | null;
  activeRole: UserRole | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (data: { user: User }) => void;
  updateUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setActiveRole: (role: UserRole | null) => void;
  reset: () => void;
}

type MyPersist = (
  config: StateCreator<UserStore>,
  options: PersistOptions<UserStore>
) => StateCreator<UserStore>;

const useUserStore = create<UserStore>(
  (persist as MyPersist)(
    (set) => ({
      user: null,
      activeRole: null,
      userId: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      setUser: ({ user }) =>
        set({
          user,
          activeRole: user.role as UserRole,
        }),
      updateUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      setActiveRole: (role) => set({ activeRole: role }),
      reset: () =>
        set({
          user: null,
          activeRole: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    { name: "userStore" }
  )
);

export default useUserStore;

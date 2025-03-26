import type { UserRole } from "@/types";
import type { User } from "@/types";
import type { StateCreator } from "zustand";
import { create } from "zustand";
import type { PersistOptions } from "zustand/middleware";
import { persist } from "zustand/middleware";

export interface UserStore {
  user: User | null;
  currentRole: UserRole | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (data: { user: User }) => void;
  updateUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setCurrentRole: (role: UserRole | null) => void;
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
      currentRole: null,
      userId: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      setUser: ({ user }) =>
        set({
          user,
          currentRole: user.role as UserRole,
        }),
      updateUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      setCurrentRole: (role) => set({ currentRole: role }),
      reset: () =>
        set({
          user: null,
          currentRole: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    { name: "userStore" }
  )
);

export default useUserStore;

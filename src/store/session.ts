import { Account } from "utils/api.gen";
import create from "zustand";
import { persist } from "zustand/middleware";

interface Session {
  jwt: string;
  account?: Account;
}

interface SessionStore extends Session {
  setSession: (session: Session) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useSessionStore = create(
  persist<SessionStore>(
    set => ({
      jwt: "",
      account: undefined,
      setSession: newSession =>
        set(() => ({
          jwt: newSession.jwt,
          account: { ...newSession.account }
        })),
      loading: true,
      setLoading: loading => set({ loading })
    }),
    {
      name: "session-storage",
      partialize: state => ({ jwt: state.jwt, account: state.account })
    }
  )
);

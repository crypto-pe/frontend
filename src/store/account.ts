import { Account } from "utils/api.gen";
import create from "zustand";

interface Session {
  jwt: string;
  account?: Account;
}

interface SessionStore extends Session {
  setSession: (session: Session) => void;
}

export const useSession = create<SessionStore>(set => ({
  jwt: "",
  account: undefined,
  setSession: newSession =>
    set(() => ({ jwt: newSession.jwt, account: { ...newSession.account } }))
}));

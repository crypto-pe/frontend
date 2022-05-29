import { Organization } from "utils/api.gen";
import create from "zustand";
import { persist } from "zustand/middleware";

interface OrganizationsStore {
  setOrganizations: (organizations: Organization[]) => void;
  organizations: Organization[];
  currentOrgId: string;
  setCurrentOrgId: (newCurrentOrgId: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useOrgnizationsStore = create(
  persist<OrganizationsStore>(
    set => ({
      currentOrgId: "",
      setCurrentOrgId: currentOrgId => set({ currentOrgId }),
      organizations: [],
      setOrganizations: organizations => set({ organizations }),
      loading: true,
      setLoading: loading => set({ loading }),
      isAdmin: false,
      setIsAdmin: isAdmin => set({ isAdmin })
    }),
    {
      name: "organizations-data",
      partialize: state => ({
        currentOrgId: state.currentOrgId
        // organizations: state.organizations <-- Fetch this from api and check currentOrgId is valid or not
      })
    }
  )
);

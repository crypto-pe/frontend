import { useOrgnizationsStore } from "store/organizations";

export const useCurrentOrganization = () => {
  const [currentOrgId, organizations, loading] = useOrgnizationsStore(state => [
    state.currentOrgId,
    state.organizations,
    state.loading
  ]);

  const currentOrg = organizations.find(org => org.id === currentOrgId);
  console.log("Current Org", currentOrgId);
  if (!currentOrg)
    throw new Error(
      "Current Organization Id does not match any of the Organizations"
    );

  return { currentOrg, loading };
};
